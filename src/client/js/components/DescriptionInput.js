var Actions = require("../Actions");
var React = require("react");

var DescriptionInput = React.createClass({

    propTypes: {
        value: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            value: this.props.value
        };
    },

    render: function() {
        return (
            <textarea
                className="form-control"
                placeholder="What day is it, again?"
                value={this.state.value}
                onChange={this.onChange}
                onBlur={this.onBlur} />
        );
    },

    onChange: function(e) {
        this.setState({
            value: e.target.value
        });
    },

    onBlur: function() {
        Actions.setDesc(this.state.value);
    }
});

module.exports = DescriptionInput;
