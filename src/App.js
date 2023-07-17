import React from "react";
import Signup from "./components/pages/Signup";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./components/pages/Login";
import Welcome from "./components/pages/Welcome";
import UpdateProfile from "./components/pages/profile/UpdateProfile";

const App = () => {
  return (
    <>
     <Switch>
        <Route path="/" exact>
        <Redirect to='/signup'/>
         
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/welcome">
          <Welcome/>
        </Route>
        <Route path="/updateprofile">
         <UpdateProfile/>
        </Route>
        </Switch>
    </>
  );
};

export default App;
