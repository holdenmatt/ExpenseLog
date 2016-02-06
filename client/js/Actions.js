// Actions are dispatched (e.g. by a view) to the Stores, and
// include a payload of data.

var Dispatcher = require("./Dispatcher");
var Constants = require("./Constants");

var Actions = {

    setDate: function(date) {
        Dispatcher.handleViewAction({
            actionType: Constants.SET_DATE,
            date: date
        });
    },

    setCurrency: function(currency) {
        Dispatcher.handleViewAction({
            actionType: Constants.SET_CURRENCY,
            currency: currency
        });
    },

    setSummary: function(summary) {
        Dispatcher.handleViewAction({
            actionType: Constants.SET_SUMMARY,
            summary: summary
        });
    },

    addExpense: function(expense) {
        Dispatcher.handleViewAction({
            actionType: Constants.ADD_EXPENSE,
            expense: expense
        });
    },

    deleteExpense: function(id) {
        Dispatcher.handleViewAction({
            actionType: Constants.DELETE_EXPENSE,
            id: id
        });
    }
};

module.exports = Actions;
