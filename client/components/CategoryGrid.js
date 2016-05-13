// Display a grid of category buttons to submit an expense.

import React, { Component, PropTypes } from "react";
import Icon from "./Icon";
import css from "./CategoryGrid.css";

export default class CategoryGrid extends Component {

    render() {
        var items = this.props.categories.map((category, index) => {
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
            <div className="CategoryGrid">
                <ul>{items}</ul>
            </div>
        );
    }

    handleClick(index) {
        var category = this.props.categories[index][0];
        this.props.onClick(index, category);
    }
}

CategoryGrid.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.array).isRequired,
    newCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func
}
