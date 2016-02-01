// Display expenses.

var Actions = require("../Actions");
var Expenses = require("../models/Expenses");
var React = require("react");
var PropTypes = React.PropTypes;

// Display a header/total, list of expenses, and input to add new ones.
var ExpenseList = React.createClass({

    propTypes: {
        tag: PropTypes.string.isRequired,
        expenses: PropTypes.instanceOf(Expenses).isRequired
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
        tag: PropTypes.string.isRequired,
        expenses: PropTypes.instanceOf(Expenses).isRequired
    },

    render: function() {
        var tag = this.props.tag;
        var expenses = this.props.expenses;
        return (
            <div className="clearfix">
                <h3 className="pull-left">{tag}</h3>
                <h3 className="pull-right">{expenses.formattedTotal()}</h3>
            </div>
        );
    }
});

// Display a single expense.
var ExpenseRow = React.createClass({

    propTypes: {
        expense: PropTypes.instanceOf(Expenses.Expense).isRequired
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
        tag: PropTypes.string.isRequired
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
