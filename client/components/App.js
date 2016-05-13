// Render the app. This component acts as a Flux "Controller-View". It listens
// for changes in the Store and passes the new data to its children as props.

import React, { Component } from "react";
import moment from "moment";
import Actions from "../Actions";
import AmountInput from "./AmountInput";
import CategoryGrid from "./CategoryGrid";
import Constants from "../Constants";
import DatePicker from "./DatePicker";
import Store from "../Store";

// Hard-code currency for now.
const CURRENCY = "USD";

function getState() {
    return {
        date: Store.getDate()
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = getState();
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
                    <AmountInput
                        symbol="$"
                        ref="AmountInput" />
                    <DatePicker date={this.state.date} />
                    <input
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
        var amtInput = this.refs.AmountInput;
        var amt = amtInput.getCents();
        if (amt > 0) {
            var date = Store.getDate();
            var note = $(".NoteInput").val();

            Actions.addExpense({
                date: date,
                category: category,
                amt: amt,
                currency: CURRENCY,
                note: note,
            });

            amtInput.setCents(0);
        } else {
            // Do something.
        }
    }

    handleStoreChange() {
        this.setState(getState());
    }
}
