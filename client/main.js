// The main entry point to render our App to the DOM.

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import css from "./main.css";

ReactDOM.render(
    <App/>,
    document.getElementById("content")
);
