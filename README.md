# JobCodeAI

## Problem

JobCodeAI is an HR-tech solution that solves the following problem:

> HR executives can’t find the right list of people to contact for training or
> comms because job codes are too unique

## Solution

A web application in which:

1. An HR executive types in a natural language description of the types of
people they want to find
2. A list of matching jobs (and people) is produced

## Approach

- scrape jobs from career websites
- store embeddings a vector database
- display a web GUI for the user to enter natural language queries and view
results

### Tech

- Scrapy/BeautifulSoup for scraping and parsing job descriptions
- NiceGUI for getting input and displaying output to/from the user
- SQLAlchemy and Alembic for storing and retrieving scalar data
- Pinecone for storing and retrieving embeddings
- OpenAI for generating embeddings and text completions

### Data

- Jobs: https://careers.marriott.com/

## Development

### Setup

```
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -e .
alembic upgrade head
```

### Run

```
python jobcodeai/app.py
```

### Generate migration (after editing a model)

```
alembic revision --autogenerate -m "<msg>"
```
