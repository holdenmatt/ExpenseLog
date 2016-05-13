// Render the app. This component acts as a Flux "Controller-View". It listens
// for changes in the Store and passes the new data to its children as props.

import React, { Component } from "react";
import Actions from "../Actions";
import AmountInput from "./AmountInput";
import CategoryGrid from "./CategoryGrid";
import Constants from "../Constants";
import DatePicker from "./DatePicker";
import Store from "../Store";

// Hard-code currency for now.
const CURRENCY = "USD";

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
        var newCategories = Store.getNewCategories();
        return (
            <form className="App">
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
                currency: CURRENCY,
                note: note,
            });

            this.refs.AmountInput.setCents(0);
            this.refs.NoteInput.value = "";
        } else {
            // Do something.
        }
    }

    handleStoreChange() {
        // this.setState(getState());
    }
}
