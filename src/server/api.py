"""
Define the REST API for our app.
"""
import datetime
from flask_restful import Resource, Api, reqparse, abort

EXPENSES = {}

def get_expenses():
    return EXPENSES.values()

def next_id():
    if len(EXPENSES) > 0:
        max_key = int(max(EXPENSES.keys()))
        return (max_key + 1)
    else:
        return 1

def add_expense(date, tag, currency, amt, desc):
    id = next_id()
    expense = {
        'id': id,
        'date': date,
        'tag': tag,
        'currency': currency,
        'amt': amt,
        'desc': desc
    }
    EXPENSES[id] = expense
    return expense

add_expense('2016-02-02', 'Food', 'THB', 100, 'khao soi lunch')
add_expense('2016-02-02', 'Food', 'THB', 250, 'dinner and beers')
add_expense('2016-02-02', 'Transport', 'THB', 1000, 'bus to chiang rai')


def abort_if_expense_doesnt_exist(id):
    if id not in EXPENSES:
        abort(404, message="Expense {} doesn't exist".format(id))

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument('date', type=str, required=True)
parser.add_argument('tag', type=str, required=True)
parser.add_argument('currency', type=str, required=True)
parser.add_argument('amt', type=int, required=True)
parser.add_argument('desc', type=str, required=True)

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
        expense = add_expense(args['date'],
                              args['tag'],
                              args['currency'],
                              args['amt'],
                              args['desc'])
        return expense, 201


def add_api_resources(app):
    api = Api(app)
    api.add_resource(ExpenseList, '/api/expenses/')
    api.add_resource(Expense, '/api/expenses/<int:id>')
    return api
