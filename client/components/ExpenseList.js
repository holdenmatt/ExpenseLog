// Render a list of most recent expenses.

import Actions from "../Actions";
import Expenses from "../models/Expenses";
import React, { Component, PropTypes } from "react";
import Store from "../Store";
import {TransitionMotion, presets, spring} from "react-motion";
import css from "./ExpenseList.css";

export default class ExpenseList extends Component {

    getExpenses() {
        return this.props.expenses
            .sortBy("date").reverse()
            .filter(exp => !exp.isNew());
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
                maxHeight: spring(85, presets.gentle),
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
        return (
            <li className="ExpenseRow list-group-item clearfix" style={this.props.style}>
                <button
                    className="close pull-right"
                    onClick={this.onDeleteClick.bind(this)}>&times;</button>

                <div className="amt list-group-item-text pull-right">{amt}</div>

                <h5 className="category list-group-item-heading pull-left">{category}</h5>
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
