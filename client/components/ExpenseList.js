// Render a list of most recent expenses.

import Actions from "../Actions";
import Constants from "../Constants";
import Expenses from "../models/Expenses";
import React, { Component, PropTypes } from "react";
import Store from "../Store";
import {TransitionMotion, presets, spring} from "react-motion";
import css from "./ExpenseList.css";
import moment from "moment";

export default class ExpenseList extends Component {

    getExpenses() {
        var expenses = this.props.expenses
            .sortBy("date")
            .reverse()
            .filter(exp => !exp.isNew());

        // Add a newDate attribute for the first expense with each date.
        var prevDate = null;
        expenses.forEach(exp => {
            var date = exp.get("date");
            if (date != prevDate) {
                prevDate = date;
                exp.newDate = date;
            } else {
                exp.newDate = null;
            }
        });

        return expenses;
    }

    getDefaultStyles() {
        return this.getExpenses().map(exp => ({
            key: String(exp.cid),
            data: exp,
            style: {maxHeight: 0, opacity: 1}
        }));
    }

    getStyles() {
        return this.getExpenses().map(exp => ({
            key: String(exp.cid),
            data: exp,
            style: {
                maxHeight: spring(106, presets.gentle),
                opacity: spring(1, presets.gentle),
            }
        }));
    }

    willEnter() {
        return {maxHeight: 0, opacity: 1};
    }

    willLeave() {
        return {maxHeight: spring(0), opacity: spring(0)};
    }

    render() {
        return (
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}>
                {styles =>
                    <ul className="ExpenseList list-group">
                        {styles.map(({key, style, data}) =>
                            <ExpenseRow expense={data} style={style} key={key} />
                        )}
                    </ul>
                }
            </TransitionMotion>
        )
    }
}
ExpenseList.propTypes = {
    expenses: PropTypes.instanceOf(Expenses).isRequired
}

class ExpenseRow extends Component {

    render() {
        var exp = this.props.expense;
        var amt = exp.formattedAmt();
        var category = exp.get("category");
        var note = exp.get("note");
        if (exp.newDate != null) {
            var date = moment(exp.newDate).format(Constants.DATE_FORMAT);
            var dateHeader = <h5 className="date">{date}</h5>;
        }
        return (
            <li className="ExpenseRow list-group-item clearfix" style={this.props.style}>
                {dateHeader}

                <button
                    className="close pull-right"
                    onClick={this.onDeleteClick.bind(this)}>&times;</button>

                <div className="amt list-group-item-text pull-right">{amt}</div>

                <div className="category list-group-item-heading pull-left">{category}</div>
                <div className="note list-group-item-text">{note}</div>
            </li>
        )
    }

    onDeleteClick() {
        var result = confirm("Really delete this?");
        if (result) {
            Actions.deleteExpense(this.props.expense.get("id"));
        }
    }
}
ExpenseRow.propTypes = {
    expense: PropTypes.instanceOf(Expenses.Expense).isRequired,
    style: PropTypes.object
}
