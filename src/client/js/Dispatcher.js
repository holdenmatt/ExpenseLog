// The Dispatcher is the central data hub for a Flux app.
// Stores register a callback with the Dispatcher. Incoming actions
// (including a data payload) are dispatched to these callbacks.

var Dispatcher = require("flux").Dispatcher;
var assign = require("object-assign");

module.exports = assign(new Dispatcher(), {

    handleViewAction: function(action) {
        this.dispatch({
            source: "VIEW_ACTION",
            action: action
        });
    },

    handleServerAction: function(action) {
        this.dispatch({
            source: "SERVER_ACTION",
            action: action
        });
    }
});
