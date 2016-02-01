var Actions = require("../Actions");
var Constants = require("../Constants");
var React = require("react");
var PropTypes = React.PropTypes;

var ExpenseList = React.createClass({

    render: function() {
        var rows = this.props.expenses.map(function(exp) {
            return (
                <ExpenseRow
                    id={exp.id}
                    amt={exp.amt}
                    currency={exp.currency}
                    desc={exp.desc}
                    key={exp.id} />
            );
        });
        return (
            <div>
                <ExpenseCategory tag={this.props.tag} expenses={this.props.expenses} />
                {rows}
                <ExpenseInput tag={this.props.tag} onAdd={this.props.onAdd} />
            </div>
        );
    }
});

var ExpenseCategory = React.createClass({

    total: function() {
        // TODO: deal with mixed currencies.

        var amts = _.pluck(this.props.expenses, "amt");
        var total = amts.reduce((a, b) => a + b, 0);
        return total > 0 ? total : "";
    },

    render: function() {
        return (
            <div className="clearfix">
                <h3 className="pull-left">{this.props.tag}</h3>
                <h3 className="pull-right">{this.total()}</h3>
            </div>
        );
    }
});

var ExpenseRow = React.createClass({

    propTypes: {
        id: PropTypes.string.isRequired,
        amt: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired
    },

    render: function() {
        var symbol = Constants.CURRENCIES[this.props.currency];
        var amt = `${this.props.amt}${symbol}`;
        return (
            <div className="ExpenseRow clearfix">
                <span className="amt">{amt} </span>
                <span className="desc">- {this.props.desc}</span>
                <button className="close pull-right" onClick={this.onDeleteClick} tabIndex="-1">&times;</button>
            </div>
        );
    },

    onDeleteClick: function() {
        var result = confirm("Really delete this?");
        if (result) {
            Actions.deleteExpense(this.props.id);
        }
    }
});

var ExpenseInput = React.createClass({

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
