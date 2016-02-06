// The Store contains the application state and logic for a domain.

var Constants = require("./Constants");
var Dispatcher = require("./Dispatcher");
var Expenses = require("./models/Expenses");
var Summaries = require("./models/Summaries");
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

        // Propagate change events from collections.
        this.get("expenses").on("all", () => this.trigger("change"));
        this.get("summaries").on("all", () => this.trigger("change"));
    },

    // Handle actions from the dispatcher (this is the only way data is modified).
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

            case Constants.SET_SUMMARY:
                var date = this.get("date");
                var summary = this.get("summaries").forDate(date);
                if (!summary) {
                    // POST
                    this.get("summaries").add({
                        date: date,
                        summary: action.summary
                    }).save();
                } else if (summary && action.summary) {
                    // PUT
                    summary.set({
                        summary: action.summary
                    }).save();
                } else if (summary && !action.summary) {
                    // DELETE
                    summary.destroy();
                }
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
    summaries: new Summaries(window.SUMMARIES),
    expenses: new Expenses(window.EXPENSES)
});

// Define public methods to access (read-only) data and listen for changes.
var Store = {

    getDate:     () => _store.get("date"),
    getCurrency: () => _store.get("currency"),

    // Get summary for the current date.
    getSummary: function() {
        var summary = _store.get("summaries").forDate(this.getDate());
        return summary ? summary.get("summary") : "";
    },

    // Get expenses for the current date.
    getExpenses: function() {
        return _store.get("expenses").forDate(this.getDate());
    },

    addChangeListener:    (cb) => _store.on("change", cb),
    removeChangeListener: (cb) => _store.off("change", cb)
};

module.exports = Store;
