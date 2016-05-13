// Render the app. This component acts as a Flux "Controller-View". It listens
// for changes in the Store and passes the new data to its children as props.

import React, { Component } from "react";
import Actions from "../Actions";
import AmountInput from "./AmountInput";
import CategoryGrid from "./CategoryGrid";
import Constants from "../Constants";
import DatePicker from "./DatePicker";
import ExpenseList from "./ExpenseList";
import Store from "../Store";

export default class App extends Component {
    constructor(props) {
        super(props);
        _.bindAll(this, "handleCategoryClick", "handleStoreChange");
    }

    componentDidMount() {
        Store.addChangeListener(this.handleStoreChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.handleStoreChange);
    }

    render() {
        var expenses = Store.getExpenses();
        var newCategories = expenses.getNewCategories();
        return (
            <div className="App">
                <form>
                    <div className="form-group">
                        <AmountInput ref="AmountInput" symbol="$" />
                        <DatePicker ref="DatePicker" />
                        <input
                            ref="NoteInput"
                            type="text"
                            className="NoteInput form-control input-lg"
                            placeholder="Note (optional)" />
                    </div>
                    <CategoryGrid
                        categories={Constants.CATEGORIES}
                        newCategories={newCategories}
                        onClick={this.handleCategoryClick} />
                </form>

                <ExpenseList expenses={expenses} />
            </div>
        );
    }

    handleCategoryClick(index, category) {
        var amt = this.refs.AmountInput.getCents();
        if (amt > 0) {
            var date = this.refs.DatePicker.getDate();
            var note = $(".NoteInput").val();
            Actions.addExpense({
                date: date,
                category: category,
                amt: amt,
                note: note,
            });

            this.refs.AmountInput.setCents(0);
            this.refs.NoteInput.value = "";
        } else {
            // Do something.
        }
    }

    handleStoreChange() {
        this.setState({});
    }
}
