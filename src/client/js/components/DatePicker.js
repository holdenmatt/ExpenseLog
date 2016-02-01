var Actions = require("../Actions");
var React = require("react");
var ReactDatePicker = require("react-datepicker");
var moment = require("moment");

var DatePicker = React.createClass({

    propTypes: {
        date: React.PropTypes.instanceOf(moment).isRequired
    },

    render: function() {
        return (
            <ReactDatePicker
                className="DatePicker pull-left"
                dateFormat="dddd MMM DD, YYYY"
                selected={this.props.date}
                onChange={this.onChange} />
        );
    },

    onChange: function(date) {
        Actions.setDate(date);
    }
});

module.exports = DatePicker;
