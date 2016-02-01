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

    setDesc: function(desc) {
        Dispatcher.handleViewAction({
            actionType: Constants.SET_DESC,
            desc: desc
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
