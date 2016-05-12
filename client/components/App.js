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
        _.bindAll(this, "handleChange", "handleCategoryClick");
    }

    componentDidMount() {
        Store.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.handleChange);
    }

    render() {
        var newCategories = Store.getNewCategories()
        return (
            <form className="App">
                <div className="form-group">
                    <AmountInput symbol="$" />
                    <DatePicker date={this.state.date} />
                    <input type="text" className="NoteInput form-control input-lg" placeholder="Note (optional)" />
                </div>
                <CategoryGrid
                    className="clearfix"
                    categories={Constants.CATEGORIES}
                    newCategories={newCategories}
                    onClick={this.handleCategoryClick} />
            </form>
        );
    }

    handleChange() {
        this.setState(getState());
    }

    handleCategoryClick(index, category) {
        var cents = $(".AmountInput input").val();
        if (cents > 0) {
            var date = Store.getDate();
            var amt = cents * 100;
            var note = $(".NoteInput").val();

            Actions.addExpense({
                date: date,
                category: category,
                amt: amt,
                currency: CURRENCY,
                note: note,
            });

            $(".AmountInput input").val(null);
        }
    }
}
