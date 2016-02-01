var Backbone = require("backbone");
var Constants = require("./Constants");

function getSymbol(currency) {
    return Constants.CURRENCIES[currency];
}

var Expense = Backbone.Model.extend({

    formattedAmt: function() {
        var amt = this.get("amt");
        var symbol = getSymbol(this.get("currency"));
        return `${amt}${symbol}`;
    }
});

var Expenses = Backbone.Collection.extend({
    model: Expense,
//    url: "/api/expenses"

    forDate: function(date) {
        return new Expenses(this.where({date: date}));
    },

    forTag: function(tag) {
        return new Expenses(this.where({tag: tag}));
    },

    formattedTotal: function() {
        // TODO: deal with mixed currencies.
        var currencies = this.pluck("currency");
        var currency = currencies.length > 0 ? currencies[0] : "";

        var amts = this.pluck("amt");
        var total = amts.reduce((a, b) => a + b, 0);
        return total > 0 ? `${total}${getSymbol(currency)}` : "";
    }
});

module.exports = {
    Expense: Expense,
    Expenses: Expenses
};
