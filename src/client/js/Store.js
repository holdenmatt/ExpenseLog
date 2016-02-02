// The Store contains the application state and logic for a domain.

var Constants = require("./Constants");
var Dispatcher = require("./Dispatcher");
var Expenses = require("./models/Expenses");
var moment = require("moment");
var _ = require("underscore");

// Define a private store. We use Backbone change events in place of
// EventEmitter (as in the Flux docs).
var _store = new Backbone.Model({
    date: moment(),
    currency: "THB",
    desc: "Travel day - Chiang Mai to Chiang Rai",
    expenses: new Expenses()
});

// Trigger a change event when expenses changes.
_store.get("expenses").on("all", function() {
    _store.trigger("change");
});

function addExpense(tag, amt, desc) {
    // Use the current date and currency.
    _store.get("expenses").add({
        id: _.uniqueId(),
        date: _store.get("date"),
        currency: _store.get("currency"),
        tag: tag,
        amt: amt,
        desc: desc,
        created: Date.now()
    });
}

// Test data
addExpense("Food", 100, "khao soi lunch");
addExpense("Food", 250, "dinner and beers");
addExpense("Transport", 1000, "bus to chiang rai");

// Handle actions from the dispatcher; this is the only way data is modified.
Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case Constants.SET_DATE:
            _store.set({
                date: action.date
            });
            break;

        case Constants.SET_CURRENCY:
            _store.set({
                currency: action.currency
            });
            break;

        case Constants.SET_DESC:
            _store.set({
                desc: action.desc
            });
            break;

        case Constants.ADD_EXPENSE:
            // Use the current date and currency.
            var exp = action.expense;
            addExpense(exp.tag, exp.amt, exp.desc);
            break;

        case Constants.DELETE_EXPENSE:
            _store.get("expenses").remove(action.id);
            break;
    }

    // No errors. Needed by promise in Dispatcher.
    return true;
});

// Define public methods to access (read-only) data and listen for changes.
var Store = {

    getDate: function() {
        return _store.get("date");
    },

    getCurrency: function() {
        return _store.get("currency");
    },

    getDesc: function() {
        return _store.get("desc");
    },

    // Get expenses for the current date.
    getExpenses: function() {
        return _store.get("expenses").forDate(this.getDate());
    },

    addChangeListener: function(cb) {
        _store.on("change", cb);
    },

    removeChangeListener: function(cb) {
        _store.off("change", cb);
    }
};

module.exports = Store;