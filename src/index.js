import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";

const initialState = {
  quizForm: {
    number: 10,
    category: 17,
    difficulty: "medium",
    type: "multiple",
  },
  categories: [],
  nbCorrect: 0,
};

const store = createStore(reducer, initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
