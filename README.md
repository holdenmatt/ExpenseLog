# ExpenseLog

A simple daily expense tracker for mobile web.

Optimized for quick entry of expenses in various (customizable) categories,
and automatic export to Google Spreadsheets.

Built using:
* Backbone to manage models, events, and syncing
* React views + Flux architecture
* Bootstrap for component styling
* Python Flask server + Flask-Restless API
* Postgres + SQLAlchemy for persistence
* Browserify to build; Bower to install front-end libs
* Babel for ES2015 + JSX transpilation
* Heroku for deployment


### Install

First install:
* [pip](https://pip.pypa.io/en/stable/installing/),
* [virtualenv](http://virtualenv.readthedocs.org/en/latest/installation.html),
* [Node.js (for NPM)](https://nodejs.org/),
* [Postgres](http://www.postgresql.org/download/),
* [Heroku Toolbelt](https://toolbelt.heroku.com/).

Then run:
```sh
$ npm install
$ npm run install:python
```


### Run locally
```sh
$ createdb ExpenseLog
$ npm start
```
Then open [http://localhost:5000](http://localhost:5000).


### Watch changes
```sh
$ npm run watch
```


### Run tests
```sh
$ createdb ExpenseLogTest
$ npm test
```


### Deploy to Heroku

Create a Python/NodeJS app with Postgres:
```sh
$ heroku login
$ heroku create --buildpack heroku/python
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku addons:create heroku-postgresql:hobby-dev
```

Deploy:
```sh
$ git push heroku master
$ heroku ps:scale web=1
$ heroku open
```
