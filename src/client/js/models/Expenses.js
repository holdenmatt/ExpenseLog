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

    // Return formatted totals (by currency) as an array.
    formattedTotals: function() {
        var totals = _.map(this.groupBy("currency"), function(expenses, currency) {
            var amts = _.map(expenses, (exp) => exp.get("amt"));
            var total = sum(amts);
            var symbol = Currencies.getSymbol(currency);
            return `${total}${symbol}`;
        });
        return totals;
    }
});

function sum(amts) {
    return amts.reduce((a, b) => a + b, 0);
}

Expenses.Expense = Expense;
module.exports = Expenses;
