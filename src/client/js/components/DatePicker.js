// Select a date.

var Actions = require("../Actions");
var React = require("react");
var ReactDatePicker = require("react-datepicker");
var classNames = require("classnames");
var moment = require("moment");

var DATE_FORMAT = "dddd MMM DD, YYYY";

var DatePicker = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        date: React.PropTypes.instanceOf(moment).isRequired
    },

    render: function() {
        var classes = classNames("DatePicker", this.props.className);
        return (
            <ReactDatePicker
                className={classes}
                dateFormat={DATE_FORMAT}
                selected={this.props.date}
                onChange={this.onChange} />
        );
    },

    onChange: function(date) {
        Actions.setDate(date);
    }
});

module.exports = DatePicker;
