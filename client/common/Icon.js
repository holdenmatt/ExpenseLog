// Render a Glyphicons or Font Awesome icon.
// If name="loading", show a spinning loading indicator.
// If name starts with "fa-" (e.g. "fa-bell"), show a Font Awesome icon.
// Otherwise, show a Glyphicons icon (e.g. "apple").

import React, { Component, PropTypes } from "react";
import css from "./Icon.css";

export default class Icon extends Component {

    getClasses(name) {
        if (name == "loading") {
            return "icon fa fa-spinner fa-pulse";
        } else if (name.startsWith("fa-")) {
            return "icon fa " + name;
        } else {
            return "icon glyphicon glyphicon-" + name;
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
