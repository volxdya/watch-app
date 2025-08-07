# coding=utf-8

from sqlalchemy import Column, String, Date, Integer, Numeric

from common.base import Base


class Subscriber(Base):
    __tablename__ = 'person'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)

    def __init__(self, user_id):
        self.user_id = user_id