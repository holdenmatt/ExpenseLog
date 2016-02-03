from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager

# TODO: Never deploy to production in DEBUG mode.
app = Flask(__name__, static_folder='../../build')
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///TravelLog.db'
db = SQLAlchemy(app)

class Expense(db.Model):
    # Auto-generated
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, server_default=db.func.now())

    # Client fields
    date = db.Column(db.Date)
    tag = db.Column(db.String(10))
    currency = db.Column(db.String(3))
    amt = db.Column(db.Integer)
    desc = db.Column(db.String(100))

db.create_all()

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Expense, methods=['GET', 'POST', 'DELETE'])

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
