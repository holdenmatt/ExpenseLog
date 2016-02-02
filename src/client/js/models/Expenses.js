// Model/Collection representing expenses.

var Currencies = require("./Currencies");

var Expense = Backbone.Model.extend({

    initialize: function(attrs) {
        this.set("currency", Currencies.get(attrs.currency));
    },

    formattedAmt: function() {
        var amt = this.get("amt");
        var symbol = this.get("currency").get("symbol");
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
        var amts = this.pluck("amt");
        var total = amts.reduce((a, b) => a + b, 0);
        if (total > 0) {
            var currency = this.pluck("currency")[0];
            var symbol = currency.get("symbol");
            return `${total}${symbol}`;
        }
        return "";
    }
});

Expenses.Expense = Expense;
module.exports = Expenses;
