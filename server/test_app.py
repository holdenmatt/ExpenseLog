import json
import unittest
from nose.tools import *
from app import app


def check_valid_json(res):
    eq_(res.headers['Content-Type'], 'application/json')
    content = json.loads(res.data)
    return content


class AppTests(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.db.drop_all()
        app.db.create_all()
        self.app = app.test_client()

    def post_json(self, url, data):
        data = json.dumps(data)
        headers = {'Content-Type': 'application/json'}
        return self.app.post(url, data=data, headers=headers)

    def put_json(self, url, data):
        data = json.dumps(data)
        headers = {'Content-Type': 'application/json'}
        return self.app.put(url, data=data, headers=headers)

    def test_expense(self):
        # Check we start empty.
        res = self.app.get('/api/expense')
        eq_(res.status_code, 200)
        content = check_valid_json(res)
        eq_(content['num_results'], 0)
        eq_(content['objects'], [])

        # Create an expense.
        res = self.post_json('/api/expense', data={
            'date': '2016-01-01',
            'tag': 'Food',
            'currency': 'USD',
            'amt': 100,
            'desc': 'dinner and beers'
        })
        eq_(res.status_code, 201)
        content = check_valid_json(res)
        eq_(content['id'], 1)
        eq_(content['amt'], 100)

        # Modify not allowed.
        res = self.put_json('/api/expense/1', data={
            'amt': 200
        })
        eq_(res.status_code, 405)

        # Get it.
        res = self.app.get('/api/expense/1')
        eq_(res.status_code, 200)
        content = check_valid_json(res)
        eq_(content['amt'], 100)

        # Get all.
        res = self.app.get('/api/expense')
        eq_(res.status_code, 200)
        content = check_valid_json(res)
        eq_(content['num_results'], 1)
        eq_(content['objects'][0]['amt'], 100)

        # Delete it.
        res = self.app.delete('/api/expense/1')
        eq_(res.status_code, 204)

        # Check we're empty again.
        res = self.app.get('/api/expense')
        content = check_valid_json(res)
        eq_(content['num_results'], 0)
