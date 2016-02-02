// Display expenses.

var Actions = require("../Actions");
var Expenses = require("../models/Expenses");
var React = require("react");

// Display a header/total, list of expenses, and input to add new ones.
var ExpenseList = React.createClass({

    propTypes: {
        tag: React.PropTypes.string.isRequired,
        expenses: React.PropTypes.instanceOf(Expenses).isRequired
    },

    render: function() {
        var expenses = this.props.expenses;
        var tag = this.props.tag;

        var rows = expenses.map(function(expense, index) {
            return (
                <ExpenseRow expense={expense} key={index} />
            );
        });
        return (
            <div>
                <ExpenseHeader tag={tag} expenses={expenses} />
                {rows}
                <ExpenseInput tag={tag} />
            </div>
        );
    }
});

// Display the tag header and expense total.
var ExpenseHeader = React.createClass({

    propTypes: {
        tag: React.PropTypes.string.isRequired,
        expenses: React.PropTypes.instanceOf(Expenses).isRequired
    },

    totals: function() {
        var totals = this.props.expenses.formattedTotals();
        var totalStr = totals.join(" + ");

        var el = totals.length >= 3 ? "h5"
               : totals.length == 2 ? "h4"
               : "h3";

        return React.createElement(el, null, totalStr);
    },

    render: function() {
        return (
            <div className="ExpenseHeader clearfix">
                <h3 className="pull-left">{this.props.tag}</h3>
                <div className="pull-right">
                    {this.totals()}
                </div>
            </div>
        );
    }
});

// Display a single expense.
var ExpenseRow = React.createClass({

    propTypes: {
        expense: React.PropTypes.instanceOf(Expenses.Expense).isRequired
    },

    render: function() {
        var exp = this.props.expense;
        return (
            <div className="ExpenseRow clearfix">
                <span className="amt">{exp.formattedAmt()}</span>
                <span className="desc"> - {exp.get("desc")}</span>
                <button
                    className="close pull-right"
                    onClick={this.onDeleteClick}
                    tabIndex="-1">&times;</button>
            </div>
        );
    },

    onDeleteClick: function() {
        var result = confirm("Really delete this?");
        if (result) {
            Actions.deleteExpense(this.props.expense.get("id"));
        }
    }
});

// Display an input to add a new expense for a given tag.
var ExpenseInput = React.createClass({

    propTypes: {
        tag: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <form className="ExpenseInput form-inline" onSubmit={this.onSubmit}>
                <input type="text" ref="input" className="form-control"
                    placeholder="[amount] [description]"/>
                <button type="submit" className="btn btn-default pull-right" tabIndex="-1">Add</button>
            </form>
        );
    },

    parseValue: function() {
        var match = /^(\d+)\s+(.+)$/.exec(this.refs.input.value);
        if (match !== null) {
            return {
                amt: parseInt(match[1]),
                desc: match[2]
            };
        }
        return null;
    },

    onSubmit: function(e) {
        e.preventDefault();

        var values = this.parseValue();
        if (values !== null) {
            Actions.addExpense({
                tag: this.props.tag,
                amt: values.amt,
                desc: values.desc
            });
            this.refs.input.value = "";
        } else {
            alert("Please use format: [amount] [description]");
            this.refs.input.select();
        }
    }
});

module.exports = ExpenseList;
