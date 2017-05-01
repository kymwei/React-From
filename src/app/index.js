import React from "react";
import ReactDOM from "react-dom";
require('../style/base.scss');
import MakeModelDropdowns from "./app"

const root = document.getElementById("root");

ReactDOM.render(
    <MakeModelDropdowns makeapi="https://api.myjson.com/bins/9fisb"/>,
    root);
