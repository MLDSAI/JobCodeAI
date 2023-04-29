from loguru import logger


EMPTY = (None, [], {}, "")


def configure_logging(logger, log_level):
    log_level_override = os.getenv("LOG_LEVEL")
    log_level = log_level_override or log_level
    logger.remove()
    logger.add(sys.stderr, level=log_level)
    logger.debug(f"{log_level=}")


def row2dict(row, follow=True):
    if isinstance(row, dict):
        return row
    try_follow = [
        "children",
    ] if follow else []
    to_follow = [key for key in try_follow if hasattr(row, key)]

    # follow children recursively
    if "children" in to_follow:
        to_follow = {key: {} for key in to_follow}
        to_follow["children"]["follow"] = to_follow

    try_include = [
        "key",
        "text",
        "canonical_key",
        "canonical_text",
    ]
    to_include = [key for key in try_include if hasattr(row, key)]
    row_dict = row.asdict(follow=to_follow, include=to_include)
    return row_dict
