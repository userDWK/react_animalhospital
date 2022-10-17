import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store/store";

ReactDOM.render(
  // <React.StrictMode>
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>
  document.getElementById("root")
);

// "http-proxy-middleware": "^2.0.6",
