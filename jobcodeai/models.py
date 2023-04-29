import sqlalchemy as sa

from jobcodeai.db import Base


class Job(Base):
    __tablename__ = "job"

    id = sa.Column(sa.Integer, primary_key=True)
    html = sa.Column(sa.String)
    url = sa.Column(sa.String)
