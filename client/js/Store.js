// The Store contains the application state and logic for a domain.

var Constants = require("./Constants");
var Dispatcher = require("./Dispatcher");
var Expenses = require("./models/Expenses");
var moment = require("moment");

const CURRENCY_KEY = "currency";

// Define a private store. We use Backbone change events in place of
// EventEmitter (as in the Flux docs).
var _Store = Backbone.Model.extend({

    defaults: {
        // Use current date.
        date: moment().format("YYYY-MM-DD"),

        // Make currency sticky using localStorage.
        currency: localStorage.getItem(CURRENCY_KEY) || "USD"
    },

    initialize: function() {
        _.bindAll(this, "handleAction");
        Dispatcher.register(this.handleAction);

        // Trigger a change event when expenses changes.
        this.get("expenses").on("all", () => {
            this.trigger("change");
        });
    },

    // Handle actions from the dispatcher (the the only way data is modified).
    handleAction: function(payload) {
        var action = payload.action;

        switch(action.actionType) {
            case Constants.SET_DATE:
                this.set({
                    date: action.date
                });
                break;

            case Constants.SET_CURRENCY:
                this.set({
                    currency: action.currency
                });
                localStorage.setItem(CURRENCY_KEY, action.currency);
                break;

            case Constants.SET_DESC:
                this.set({
                    desc: action.desc
                });
                break;

            case Constants.ADD_EXPENSE:
                // Use the current date and currency.
                var exp = action.expense;
                this.get("expenses").add({
                    date: this.get("date"),
                    tag: exp.tag,
                    currency: this.get("currency"),
                    amt: exp.amt,
                    desc: exp.desc
                }).save();
                break;

            case Constants.DELETE_EXPENSE:
                this.get("expenses").get(action.id).destroy();
                break;
        }

        // No errors. Needed by promise in Dispatcher.
        return true;
    }
});

var _store = new _Store({
    desc: "Travel day - Chiang Mai to Chiang Rai",
    expenses: new Expenses(window.EXPENSES)
});

// Define public methods to access (read-only) data and listen for changes.
var Store = {

    getDate:     () => _store.get("date"),
    getCurrency: () => _store.get("currency"),
    getDesc:     () => _store.get("desc"),

    // Get expenses for the current date.
    getExpenses: function() {
        return _store.get("expenses").forDate(this.getDate());
    },

    addChangeListener:    (cb) => _store.on("change", cb),
    removeChangeListener: (cb) => _store.off("change", cb)
};

module.exports = Store;
