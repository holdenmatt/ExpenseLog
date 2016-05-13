// Actions are dispatched (e.g. by a view) to the Stores,
// and include a payload of data.

import Constants from "./Constants";
import Dispatcher from "./Dispatcher";

module.exports = {

    addExpense: function(expense) {
        console.log(expense)
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
}
