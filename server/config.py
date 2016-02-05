import os

class Config(object):
    DEBUG = os.environ['DEBUG']

    STATIC_FOLDER = '../build'

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
