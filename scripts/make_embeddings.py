from loguru import logger
from tqdm.auto import tqdm  # this is our progress bar
import openai
import pandas as pd
import pinecone
import pymysql

from jobcodeai import cache, config



MODEL = "text-embedding-ada-002"
TABLE = "job"
BATCH_SIZE = 32


db = pymysql.connect(
    host=config.DB_HOST,
    user=config.DB_USERNAME,
    password=config.DB_PASSWORD,
    database=config.DB_NAME,
    autocommit=True,
)

openai.api_key = config.OPENAI_API_KEY

pinecone.init(
    api_key=config.PINECONE_API_KEY,
    environment=config.PINECONE_ENV,
)


@cache.cache()
def _get_embedding(input, model):
    logger.debug(f"{input=}")
    res = openai.Embedding.create(
        input=input,
        engine=model,
    )
    logger.debug(f"{res=}")
    return res


def get_embedding(text, model=MODEL):
    logger.info(f"{text=}")
    response = _get_embedding(text, model)
    embedding = response["data"][0]["embedding"]
    logger.info(f"{len(embedding)=}")
    return embedding


embedding = get_embedding("test")
if config.PINECONE_INDEX  not in pinecone.list_indexes():
    pinecone.create_index(config.PINECONE_INDEX, dimension=len(embedding))
index = pinecone.Index(config.PINECONE_INDEX)
logger.info(f"{index=}")


def run_sql(sql):
    logger.info(f"{sql=}")
    try:
        df = pd.read_sql(sql, db)
    except TypeError:
        return None
    logger.info(f"df=\n{df}")
    return df


def main():
    df = run_sql(f"SELECT * FROM {TABLE}")

    if not "embedding" in df.columns:
        run_sql(f"""
            ALTER TABLE {TABLE}
            ADD `embedding` JSON;
        """)

    import ipdb; ipdb.set_trace()

    rows = df.to_dict("records")
    rows_to_embed = [
        row
        for row in rows
        if not row["embedding"]
    ]
    position_summaries_to_embed = [
        row["positionSummary"]
        for row in rows_to_embed
    ]
    ids_to_embed = [
        row["id"]
        for row in rows_to_embed
    ]

    for i in tqdm(range(0, len(rows_to_embed), BATCH_SIZE)):
        # set end position of batch
        i_end = min(i+BATCH_SIZE, len(rows_to_embed))
        # get batch of lines and IDs
        lines_batch = position_summaries_to_embed[i: i+BATCH_SIZE]
        ids_batch = [str(id) for id in ids_to_embed[i: i+BATCH_SIZE]]
        # create embeddings
        res = _get_embedding(lines_batch, MODEL)
        embeds = [record['embedding'] for record in res['data']]
        # prep metadata and upsert batch
        meta = [{'text': line} for line in lines_batch]
        to_upsert = zip(ids_batch, embeds, meta)
        # upsert to Pinecone
        index.upsert(vectors=list(to_upsert))

        to_upsert = zip(ids_batch, embeds, meta)
        for id, embed, meta in to_upsert:
            run_sql(f"""
                UPDATE {TABLE}
                SET embedding = "{embed}"
                WHERE id = {id};
            """)
        

    import ipdb; ipdb.set_trace()


if __name__ == "__main__":
    main()
