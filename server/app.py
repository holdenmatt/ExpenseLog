from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager
from config import Config

app = Flask(__name__, static_folder=Config.STATIC_FOLDER)
app.config.from_object(Config)

db = app.db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    category = db.Column(db.String(20))
    amt = db.Column(db.Integer)
    currency = db.Column(db.String(3))
    note = db.Column(db.String(100))

db.create_all()

page_size = app.config['PAGE_SIZE']
manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Expense, methods=['GET', 'POST', 'DELETE'], results_per_page=page_size)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
