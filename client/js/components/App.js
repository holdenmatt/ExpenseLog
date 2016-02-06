// Render the app. This component acts as a Flux "Controller-View". It listens
// for changes in the Store and passes the new data to its children.

var Constants = require("../Constants");
var CurrencyPicker = require("./CurrencyPicker");
var DatePicker = require("./DatePicker");
var ExpenseList = require("./ExpenseList");
var React = require("react");
var Store = require("../Store");
var SummaryInput = require("./SummaryInput");

function getState() {
    return {
        date: Store.getDate(),
        currency: Store.getCurrency(),
        summary: Store.getSummary(),
        expenses: Store.getExpenses(),
    }
}

var App = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        Store.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        Store.removeChangeListener(this.onChange);
    },

    onChange: function() {
        this.setState(getState());
    },

    render: function() {

        var lists = Constants.TAGS.map((tag, index) => {
            var expenses = this.state.expenses.forTag(tag);
            return (
                <ExpenseList
                    tag={tag}
                    expenses={expenses}
                    key={index} />
            );
        });

        return (
            <div className="App">
                <div className="clearfix form-group">
                    <DatePicker date={this.state.date} className="pull-left" />
                    <CurrencyPicker currency={this.state.currency} className="pull-right" />
                </div>

                {/* Add a key, so we render a new defaultValue if summary changes. */}
                <SummaryInput value={this.state.summary} key={this.state.summary} />

                {lists}
            </div>
        );
    }
});

module.exports = App;
