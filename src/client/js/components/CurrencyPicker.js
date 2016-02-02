// Select a currency.

var Actions = require("../Actions");
var Currencies = require("../models/Currencies");
var React = require("react");
var Select = require("react-select");
var classNames = require("classnames");

var CurrencyPicker = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        currency: React.PropTypes.string.isRequired
    },

    render: function() {
        var classes = classNames("CurrencyPicker", this.props.className);
        var options = Currencies.map(function(currency) {
            return {
                value: currency.get("id"),
                label: currency.getName()
            };
        });
        return (
            <Select
                className={classes}
                options={options}
                value={this.props.currency}
                clearable={false}
                onChange={this.onChange} />
        );
    },

    onChange: function(value) {
        Actions.setCurrency(value);
    }
});

module.exports = CurrencyPicker;
