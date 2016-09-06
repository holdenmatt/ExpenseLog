import os

class Config(object):
    DEBUG = os.environ.get('DEBUG', False)

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    STATIC_FOLDER = '../build'
