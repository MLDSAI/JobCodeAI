from loguru import logger

from jobcodeai.db import Session
from jobcodeai.models import Job

db = Session()


def get_jobs():
    return (
        db
        .query(Job)
        .all()
    )


def insert_job(job_data):
    db_obj = Job(**job_data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
