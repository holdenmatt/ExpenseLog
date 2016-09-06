import os

class Config(object):
    DEBUG = os.environ.get('DEBUG', False)

    # Disable pagination, unless specified by the client.
    RESULTS_PER_PAGE = -1

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    STATIC_FOLDER = '../build'
