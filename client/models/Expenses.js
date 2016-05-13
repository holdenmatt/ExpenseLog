// Model/Collection representing expenses.

// Hard-code currency for now.
const CURRENCY = "USD";

var Expense = Backbone.Model.extend({

    formattedAmt: function() {
        var amt = this.get("amt");
        return `$ ${Number(amt / 100).toFixed(2)}`;
    }
});

var Expenses = Backbone.Collection.extend({
    model: Expense,
    url: "/api/expense",

    addExpense: function(exp) {
        return this.add({
            date: exp.date,
            category: exp.category,
            amt: exp.amt,
            note: exp.note,
            currency: CURRENCY
        });
    },

    getNewExpenses: function() {
        return this.filter(function(expense) {
            return expense.isNew();
        });
    },

    getNewCategories: function() {
        var categories = this.getNewExpenses().map(function(expense) {
            return expense.get("category");
        });
        return _.unique(categories);
    }
});

Expenses.Expense = Expense;
module.exports = Expenses;
