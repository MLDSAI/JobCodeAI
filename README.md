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

Behind the scenes we have a list of job codes and their descriptions. When the
user types in attributes of the people he wants to find, JobCodeAI produces
a list of matching jobs.

### Tech

- Scrapy/BeautifulSoup for scraping and parsing job descriptions
- NiceGUI for getting input and displayout output to/from the user
- SQLAlchemy and Alembic for interacting with data
- OpenAI for generating text completions

### Data

- Jobs: https://careers.marriott.com/
