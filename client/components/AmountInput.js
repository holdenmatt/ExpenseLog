// Enter a currency amount.

import React, { Component, PropTypes } from "react";
import CurrencyMaskedInput from "react-currency-masked-input";
import css from "./AmountInput.css";

export default class AmountInput extends Component {

    render() {
        return (
            <div className="AmountInput">
                <span>{this.props.symbol}</span>
                <CurrencyMaskedInput
                    className="form-control input-lg"
                    placeholder="0.00"
                    />
            </div>
        );
    }
}

AmountInput.propTypes = {
    symbol: PropTypes.string.isRequired
}
