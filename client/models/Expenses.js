// Model/Collection representing expenses.

var Expense = Backbone.Model.extend({

});

var Expenses = Backbone.Collection.extend({
    model: Expense,
    url: "/api/expense",

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
