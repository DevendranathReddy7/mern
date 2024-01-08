import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./users/pages/Users";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import Userplaces from "./places/pages/Userplaces";
import Newplaces from "./places/pages/Newplaces";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userid/places" exact>
            <Userplaces />
          </Route>
          <Route path="/places/new" exact>
            <Newplaces />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
