// Enter a currency amount.

import React, { Component, PropTypes } from "react";
import CurrencyMaskedInput from "react-currency-masked-input";
import css from "./AmountInput.css";

export default class AmountInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    getCents() {
        return this.state.value * 100;
    }

    setCents(cents) {
        this.setState({
            value: String(cents / 100)
        });
    }

    render() {
        var value = this.state.value || null;
        return (
            <div className="AmountInput">
                <span>{this.props.symbol}</span>
                <CurrencyMaskedInput
                    value={value}
                    className="form-control input-lg"
                    placeholder="0.00"
                    onChange={this.handleChange.bind(this)}
                    />
            </div>
        );
    }

    handleChange(evt, value) {
        this.setState({
            value: value
        });
    }
}

AmountInput.propTypes = {
    symbol: PropTypes.string.isRequired
}
