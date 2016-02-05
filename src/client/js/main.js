// The main entry point to render our App to the DOM.

var App = require("./components/App");
var React = require("react");
var ReactDOM = require("react-dom");
var css = require("../css/main.css");

ReactDOM.render(
    <App/>,
    document.getElementById("content")
);
