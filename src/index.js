import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/";
import "./styles.css";
import {register} from './serviceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
register();
