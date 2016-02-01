// The main entry point to render our App to the DOM.

var React = require("react"),
    ReactDOM = require("react-dom"),
    App = require("./components/App");

ReactDOM.render(
    <App/>,
    document.getElementById("content")
);
