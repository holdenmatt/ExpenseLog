var Constants = require("./Constants");
var Dispatcher = require("./Dispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var moment = require("moment");

var CHANGE = "change";

// Define the private data.
var _store = {
    date: moment(),
    currency: "THB",
    desc: "Travel day - Chiang Mai to Chiang Rai",
    expenses: {}
};

var IDS = 0;
function createExpense(tag, amt, desc) {
    // Use the current date and currency.
    var date = _store.date;
    var currency = _store.currency;

    // Use the current timestamp in place of a real id.
    var now = Date.now();
    var id = `${now}-${IDS++}`;

    _store.expenses[id] = {
        id: id,
        date: date,
        tag: tag,
        amt: amt,
        currency: currency,
        desc: desc,
        created: now
    };
}

// Test data
createExpense("Food", 100, "khao soi lunch");
createExpense("Food", 250, "dinner and beers");
createExpense("Transport", 1000, "bus to chiang rai");

// Define public methods for views to listen for changes and retrieve data.
var Store = assign({}, EventEmitter.prototype, {

    getDate: function() {
        return _store.date;
    },

    getCurrency: function() {
        return _store.currency;
    },

    getDesc: function() {
        return _store.desc;
    },

    // Get expenses for the current date.
    getExpenses: function() {
        // TODO: fix this.
        return _store.expenses;
    },

    addChangeListener: function(cb) {
        this.on(CHANGE, cb);
    },

    removeChangeListener: function(cb) {
        this.removeListener(CHANGE, cb)
    }
});

// Register actions with the dispatcher: update data and emit a change.
Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case Constants.SET_DATE:
            _store.date = action.date;
            Store.emit(CHANGE);
            break;

        case Constants.SET_CURRENCY:
            _store.currency = action.currency;
            Store.emit(CHANGE);
            break;

        case Constants.SET_DESC:
            _store.desc = action.desc;
            Store.emit(CHANGE);
            break;

        case Constants.ADD_EXPENSE:
            var exp = action.expense;
            createExpense(exp.tag, exp.amt, exp.desc);
            Store.emit(CHANGE);
            break;

        case Constants.DELETE_EXPENSE:
            delete _store.expenses[action.id];
            Store.emit(CHANGE);
            break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = Store;
