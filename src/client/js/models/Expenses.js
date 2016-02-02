// Model/Collection representing expenses.

var Currencies = require("./Currencies");

var Expense = Backbone.Model.extend({

    formattedAmt: function() {
        var amt = this.get("amt");
        var currency = this.get("currency");
        var symbol = Currencies.getSymbol(currency);
        return `${amt}${symbol}`;
    }
});

var Expenses = Backbone.Collection.extend({
    model: Expense,
    url: "/api/expenses/",

    forDate: function(date) {
        return new Expenses(this.where({date: date}));
    },

    forTag: function(tag) {
        return new Expenses(this.where({tag: tag}));
    },

    formattedTotal: function() {
        // TODO: deal with mixed currencies.
        var amts = this.pluck("amt");
        var total = amts.reduce((a, b) => a + b, 0);
        if (total > 0) {
            var currency = this.pluck("currency")[0];
            var symbol = Currencies.getSymbol(currency);
            return `${total}${symbol}`;
        }
        return "";
    }
});

Expenses.Expense = Expense;
module.exports = Expenses;
