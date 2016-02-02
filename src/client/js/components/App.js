// Render the app. This component acts as a Flux "Controller-View". It listens
// for changes in the Store and passes the new data to its children.

var Constants = require("../Constants");
var CurrencyPicker = require("./CurrencyPicker");
var DatePicker = require("./DatePicker");
var DescriptionInput = require("./DescriptionInput");
var ExpenseList = require("./ExpenseList");
var React = require("react");
var Store = require("../Store");

function getState() {
    return {
        expenses: Store.getExpenses(),
        date: Store.getDate(),
        currency: Store.getCurrency(),
        desc: Store.getDesc()
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

                <DescriptionInput value={this.state.desc} />

                {lists}
            </div>
        );
    }
});

module.exports = App;
