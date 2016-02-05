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
        date: React.PropTypes.string.isRequired
    },

    render: function() {
        var date = moment(this.props.date);
        var classes = classNames("DatePicker", this.props.className);
        return (
            <ReactDatePicker
                className={classes}
                dateFormat={DATE_FORMAT}
                selected={date}
                readOnly={true}     // Disable keyboard
                onChange={this.onChange} />
        );
    },

    onChange: function(date) {
        var dateString = date.format("YYYY-MM-DD");
        if (dateString != this.props.date) {
            Actions.setDate(dateString);
        }
    }
});

module.exports = DatePicker;
