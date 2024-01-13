import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
      <Route
          exact
          path="/"
          component={loadable(() => import("./views/pages/home/home"))}
        />
        <Route
          exact
          path="/user/login"
          component={loadable(() => import("./views/pages/User/login/login"))}
        />
        <Route
          exact
          path="/user/billing"
          component={loadable(() => import("./views/pages/User/billing/billing"))}
        />
        <Route
          exact
          path="/user/profile"
          component={loadable(() =>
            import("./views/pages/User/profile/profile"),
          )}
        />
        <Route
          exact
          path="/user/book"
          component={loadable(() =>
            import("./views/pages/User/book/book"),
          )}
        />
        <Route
          exact
          path="/garage/dashboard"
          component={loadable(() =>
            import("./views/pages/Garages/dashboard/dashboard"),
          )}
        />
        <Route
          exact
          path="/garage/:garage"
          component={loadable(() =>
            import("./views/pages/Garages/garage/garage"),
          )}
        />
        <Route component={loadable(() => import("./views/pages/404"))} />
      </Switch>
    </Router>
  );
}
