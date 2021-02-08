import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Appliance } from "./features/appliance/Appliance";
import { BrowserRouter, Route } from "react-router-dom";
import { Header } from "./features/header/Header";
import { ApplianceList } from "./features/applianceList/ApplianceList";
import { ApplianceForm } from "./features/applianceForm/ApplianceForm";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Route path="/" exact={true} component={ApplianceList} />
        <Route path="/appliance/view/:id" exact={true} component={Appliance} />
        <Route
          path="/appliance/create"
          exact={true}
          component={ApplianceForm}
        />
        {/* <App /> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
