from flask import Flask, render_template

DEBUG = True    # TODO: Never deploy to production in DEBUG mode.
STATIC_FOLDER = '../../build'

app = Flask(__name__, static_folder=STATIC_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=DEBUG)
