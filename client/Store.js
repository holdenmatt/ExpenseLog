// The Store contains the application state and logic for a domain.

import moment from "moment";
import Constants from "./Constants";
import Dispatcher from "./Dispatcher";
import Expenses from "./models/Expenses";

// Define a private store. We use Backbone change events in place of
// EventEmitter (as in the Flux docs).
var _Store = Backbone.Model.extend({

    defaults: {
        // Use current date.
        date: moment().format("YYYY-MM-DD"),

        // Load JSON expenses from the server.
        expenses: new Expenses(window.EXPENSES)
    },

    initialize: function() {
        Dispatcher.register(this.handleAction.bind(this));

        // Propagate change events from the collection.
        this.get("expenses").on("all", () => this.trigger("change"));
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

            case Constants.ADD_EXPENSE:
                this.get("expenses").add(action.expense).save();
                break;

            case Constants.DELETE_EXPENSE:
                this.get("expenses").get(action.id).destroy();
                break;
        }

        // No errors. Needed by promise in Dispatcher.
        return true;
    }
});

const _store = new _Store();

// Define public methods to access (read-only) data and listen for changes.
var Store = {
    getDate: () => _store.get("date"),

    // Return categories with new (unsaved) expenses.
    getNewCategories: () => _store.get("expenses").getNewCategories(),

    addChangeListener:    (cb) => _store.on("change", cb),
    removeChangeListener: (cb) => _store.off("change", cb)
};

module.exports = Store;
