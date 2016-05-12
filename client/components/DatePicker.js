// Select a date.

import moment from "moment";
import React, { Component, PropTypes } from "react";
import ReactDatePicker from "react-datepicker";
import Actions from "../Actions";

const DATE_FORMAT = "MMM DD, YYYY";

export default class DatePicker extends Component {

    render() {
        var date = moment(this.props.date);
        return (
            <ReactDatePicker
                className="DatePicker input-lg"
                dateFormat={DATE_FORMAT}
                selected={date}
                readOnly={true} // Disable keyboard
                onChange={this.handleChange.bind(this)} />
        );
    }

    handleChange(date) {
        var dateString = date.format("YYYY-MM-DD");
        if (dateString != this.props.date) {
            Actions.setDate(dateString);
        }
    }
}

DatePicker.propTypes = {
    date: PropTypes.string.isRequired
}
