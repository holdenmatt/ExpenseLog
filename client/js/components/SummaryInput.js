// Enter a summary for the current date.

var Actions = require("../Actions");
var React = require("react");

var SummaryInput = React.createClass({

    propTypes: {
        value: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <textarea
                className="form-control"
                placeholder="What day is it, again?"
                defaultValue={this.props.value}
                onBlur={this.onBlur} />
        );
    },

    onBlur: function(e) {
        Actions.setSummary(e.target.value);
    }
});

module.exports = SummaryInput;
