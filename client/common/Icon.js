// Render an icon.

import React, { Component, PropTypes } from "react";
import css from "./Icon.css";

export default class Icon extends Component {

    getClasses(name) {
        if (name == "loading") {
            return "glyphicon glyphicon-refresh spinning";
        } else {
            return "glyphicon glyphicon-" + name;
        }
    }

    render() {
        var classes = this.getClasses(this.props.name);
        return (
            <div className="Icon">
                <span className={classes}></span>
                <span className="icon-label">{this.props.label}</span>
            </div>
        )
    }
}
Icon.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string
}
