// Define the currencies available for expenses.

// TODO: Replace this with a standard formatting method?
const POSTFIX = {
    "MMK": true,
    "THB": true
};

var Currency = Backbone.Model.extend({
    getName: function() {
        var name = this.get("name");
        if (name) {
            return name;
        } else {
            var code = this.get("id");
            var symbol = this.get("symbol");
            return `${code} (${symbol})`;
        }
    }
});

var Currencies = Backbone.Collection.extend({
    model: Currency,

    getSymbol: function(code) {
        return this.get(code).get("symbol");
    },

    format: function(code, amt) {
        var symbol = this.getSymbol(code);
        if (POSTFIX[code]) {
            return `${amt}${symbol}`;
        } else {
            return `${symbol}${amt}`;
        }
    }
});

module.exports = new Currencies([
    {id: "USD", symbol: "$"},
    {id: "PEN", symbol: "S/ ", name: "PEN [Soles] (S/)"},
    {id: "EUR", symbol: "€"},
    {id: "THB", symbol: "฿"},
    {id: "MMK", symbol: "K", name: "MMK [khat] (K)"},
    {id: "JPY", symbol: "¥"},
]);
