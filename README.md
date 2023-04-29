# JobCodeAI

## Problem

JobCodeAI ia an HR-tech solution that solves the following problem:

> Can’t find the right list of people to contact for training or comms because job codes are too unique

## Solution

An HR executive types in the attributes of the types of people they want to find, and we output a list.

Behind the scenes we have a list of job codes and their descriptions. When the user types in attributes of the people he wants to find, JobCodeAI produces a list of matching jobs.

### Tech

- Scrapy/BeautifulSoup for scraping and parsing job descriptions
- NiceGUI for getting input and displayout output to/from the user
- SQLAlchemy and Alembic for interacting with data
- OpenAI for generating text completions

### Data

- Jobs: https://careers.marriott.com/
