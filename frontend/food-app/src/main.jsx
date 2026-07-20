import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import App from "./App";
import store, { persistor } from "./redux/store";
import DataProvider from "./context/DataProvider";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DataProvider>
            <App />
          </DataProvider>
        </PersistGate>
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
