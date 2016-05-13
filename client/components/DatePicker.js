// Select a date.

import moment from "moment";
import React, { Component, PropTypes } from "react";
import ReactDatePicker from "react-datepicker";
import Actions from "../Actions";

const DISPLAY_FORMAT = "MMM DD, YYYY";

export default class DatePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // Start with current date.
            date: moment()
        }
    }

    getDate() {
        return this.state.date.format("YYYY-MM-DD")
    }

    render() {
        return (
            <ReactDatePicker
                className="DatePicker input-lg"
                dateFormat={DISPLAY_FORMAT}
                selected={this.state.date}
                readOnly={true} // Disable keyboard
                onChange={this.handleChange.bind(this)} />
        );
    }

    handleChange(date) {
        this.setState({
            date: date
        });
    }
}
