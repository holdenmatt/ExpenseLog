// Define the currencies available for expenses.

var Backbone = require("backbone");

var Currency = Backbone.Model.extend({
    getName: function() {
        var code = this.get("id");
        var symbol = this.get("symbol");
        return `${code} (${symbol})`;
    }
});

var Currencies = Backbone.Collection.extend({
    model: Currency
});

module.exports = new Currencies([
    {id: "USD", symbol: "$"},
    {id: "EUR", symbol: "€"},
    {id: "THB", symbol: "฿"},
    {id: "JPY", symbol: "¥"},
]);
