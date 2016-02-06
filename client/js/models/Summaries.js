// Represent a summary string for a single date.

var Summary = Backbone.Model.extend({

});

var Summaries = Backbone.Collection.extend({
    model: Summary,
    url: "/api/summary",

    forDate: function(date) {
        var results = this.where({date: date});
        if (results.length > 1) {
            throw new Error("Expected a unique summary per date");
        }

        return results.length == 1 ? results[0] : null;
    }
});

module.exports = Summaries;
