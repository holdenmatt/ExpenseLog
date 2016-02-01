var Actions = require("../Actions");
var Constants = require("../Constants");
var React = require("react");
var Select = require("react-select");

var CurrencyPicker = React.createClass({

    propTypes: {
        currency: React.PropTypes.string.isRequired
    },

    render: function() {
        var options = _.map(Constants.CURRENCIES, function(symbol, code) {
            return {
                value: code,
                label: `${code} (${symbol})`
            };
        });

        return (
            <Select
                className="CurrencyPicker pull-right"
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
