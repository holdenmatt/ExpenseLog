// Render a list of most recent expenses.

import Actions from "../Actions";
import Expenses from "../models/Expenses";
import React, { Component, PropTypes } from "react";
import css from "./ExpenseList.css";

export default class ExpenseList extends Component {

    render() {
        var expenses = this.props.expenses.sortBy("date").reverse();
        var rows = expenses.map((expense, index) => {
            return (
                <ExpenseRow expense={expense} key={index} />
            );
        });
        return (
            <ul className="ExpenseList list-group">
                {rows}
            </ul>
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
            <li className="ExpenseRow list-group-item clearfix">
                <button
                    className="close pull-right"
                    onClick={this.onDeleteClick.bind(this)}
                    tabIndex="-1">&times;</button>

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
    expense: PropTypes.instanceOf(Expenses.Expense).isRequired
}
