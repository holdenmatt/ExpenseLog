// Display a grid of category buttons to submit an expense.

import Constants from "../Constants";
import Icon from "../common/Icon";
import React, { Component, PropTypes } from "react";
import Store from "../Store";
import css from "./CategoryGrid.css";

export default class CategoryGrid extends Component {

    render() {
        var items = Constants.CATEGORIES.map(({name, icon}, index) => {
            var loading = _.contains(this.props.newCategories, name);
            icon = loading ? "loading" : icon;
            return (
                <li key={index} onClick={this.handleClick.bind(this, index)}>
                    <Icon name={icon} label={name} />
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
        var category = Constants.CATEGORIES[index].name;
        this.props.onClick(index, category);
    }
}

CategoryGrid.propTypes = {
    newCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func
}
