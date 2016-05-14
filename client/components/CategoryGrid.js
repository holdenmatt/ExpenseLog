// Display a grid of category buttons to submit an expense.

import Constants from "../Constants";
import Icon from "../common/Icon";
import React, { Component, PropTypes } from "react";
import Store from "../Store";
import css from "./CategoryGrid.css";

export default class CategoryGrid extends Component {

    render() {
        var items = Constants.CATEGORIES.map((category, index) => {
            var label = category[0];
            var loading = _.contains(this.props.newCategories, label);
            var name = loading ? "loading" : category[1];
            return (
                <li key={index} onClick={this.handleClick.bind(this, index)}>
                    <Icon name={name} label={label} />
                </li>
            );
        });

        return (
            <ul className="CategoryGrid clearfix">
                {items}
            </ul>
        );
    }

    handleClick(index) {
        var category = Constants.CATEGORIES[index][0];
        this.props.onClick(index, category);
    }
}

CategoryGrid.propTypes = {
    newCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func
}
