// Select a date.

import Actions from "../Actions";
import Constants from "../Constants";
import React, { Component, PropTypes } from "react";
import ReactDatePicker from "react-datepicker";
import moment from "moment";


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
                popoverAttachment='top right'
                popoverTargetAttachment='bottom right'
                dateFormat={Constants.DATE_FORMAT}
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
