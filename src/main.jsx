import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { getAllUsers } from "./features/users/usersSlice";
import axios from "axios";

store.dispatch(getAllUsers());

const setupDefaultHeaders = () => {
  const { token } = JSON.parse(localStorage?.getItem("login")) || {
    token: null,
  };

  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

setupDefaultHeaders();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
