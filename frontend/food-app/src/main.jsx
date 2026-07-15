import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {Provider} from "react-redux";
import store from './redux/store'; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
         />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

