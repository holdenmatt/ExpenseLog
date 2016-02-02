from flask import Flask, render_template
from api import add_api_resources, get_expenses

DEBUG = True    # TODO: Never deploy to production in DEBUG mode.
STATIC_FOLDER = '../../build'

app = Flask(__name__, static_folder=STATIC_FOLDER)
add_api_resources(app)

@app.route('/')
def index():
    expenses = get_expenses()
    return render_template('index.html', expenses=expenses)

if __name__ == '__main__':
    app.run(debug=DEBUG)
