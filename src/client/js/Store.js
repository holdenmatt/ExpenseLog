var Constants = require("./Constants");
var Dispatcher = require("./Dispatcher");
var EventEmitter = require("events").EventEmitter;
var Models = require("./Models");
var assign = require("object-assign");
var moment = require("moment");


// Define the private data.
var _store = {
    date: moment(),
    currency: "THB",
    desc: "Travel day - Chiang Mai to Chiang Rai",
    expenses: new Models.Expenses()
};

var IDS = 0;
function createExpense(tag, amt, desc) {
    // Use the current date and currency.
    var date = _store.date;
    var currency = _store.currency;

    // Use the current timestamp in place of a real id for now.
    // TODO: fix this.
    var now = Date.now();
    var id = `${now}-${IDS++}`;

    _store.expenses.add({
        id: id,
        date: date,
        currency: currency,
        tag: tag,
        amt: amt,
        desc: desc,
        created: Date.now()
    });
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
        return _store.expenses.forDate(_store.date);
    },

    addChangeListener: function(cb) {
        this.on("change", cb);
    },

    removeChangeListener: function(cb) {
        this.removeListener("change", cb)
    },

    emitChange: function() {
        this.emit("change");
    }
});

// Register actions with the dispatcher: update data and emit a change.
Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case Constants.SET_DATE:
            _store.date = action.date;
            Store.emitChange();
            break;

        case Constants.SET_CURRENCY:
            _store.currency = action.currency;
            Store.emitChange();
            break;

        case Constants.SET_DESC:
            _store.desc = action.desc;
            Store.emitChange();
            break;

        case Constants.ADD_EXPENSE:
            var exp = action.expense;
            createExpense(exp.tag, exp.amt, exp.desc);
            Store.emitChange();
            break;

        case Constants.DELETE_EXPENSE:
            _store.expenses.remove(action.id);
            Store.emitChange();
            break;
    }

    // No errors. Needed by promise in Dispatcher.
    return true;
});

module.exports = Store;
