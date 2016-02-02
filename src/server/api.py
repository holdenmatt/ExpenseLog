"""
Define the REST API for our app.
"""
import datetime
from flask_restful import Resource, Api, reqparse, abort


TODAY = datetime.date.today().isoformat()
NOW = datetime.datetime.now().isoformat()

EXPENSES = {}

def get_expenses():
    return EXPENSES.values()

def next_id():
    if len(EXPENSES) > 0:
        max_key = int(max(EXPENSES.keys()))
        return (max_key + 1)
    else:
        return 1

def add_expense(tag, currency, amt, desc):
    id = next_id()
    expense = {
        'id': id,
        'created': NOW,
        'date': TODAY,
        'tag': tag,
        'currency': currency,
        'amt': amt,
        'desc': desc
    }
    EXPENSES[id] = expense
    return expense

add_expense('Food', 'THB', 100, 'khao soi lunch')
add_expense('Food', 'THB', 250, 'dinner and beers')
add_expense('Transport', 'THB', 1000, 'bus to chiang rai')


def abort_if_expense_doesnt_exist(id):
    if id not in EXPENSES:
        abort(404, message="Expense {} doesn't exist".format(id))

parser = reqparse.RequestParser()
parser.add_argument('tag')
parser.add_argument('currency')
parser.add_argument('amt')
parser.add_argument('desc')

"""A single expense: fetch or delete."""
class Expense(Resource):
    def get(self, id):
        abort_if_expense_doesnt_exist(id)
        return EXPENSES[id]

    def delete(self, id):
        abort_if_expense_doesnt_exist(id)
        del EXPENSES[id]
        return '', 204

"""A list of all expenses: fetch all, or POST a new expense."""
class ExpenseList(Resource):
    def get(self):
        return get_expenses()

    def post(self):
        args = parser.parse_args()
        expense = add_expense(args['tag'],
                              args['currency'],
                              args['amt'],
                              args['desc'])
        return expense, 201


def add_api_resources(app):
    api = Api(app)
    api.add_resource(ExpenseList, '/api/expenses')
    api.add_resource(Expense, '/api/expenses/<int:id>')
    return api
