import React, { useContext } from "react";
import Signup from "./components/pages/Signup";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./components/pages/Login";
import Welcome from "./components/pages/Welcome";
import UpdateProfile from "./components/pages/profile/UpdateProfile";
import VerificationPage from "./components/pages/VerificationPage";
import FirstPageDetails from "./components/pages/FirstPage";
import ForgetPassword from "./components/pages/ForgetPassword";
import AddExpense from "./components/pages/expense/AddExpense";
import AuthContext from "./store/auth-context";
import { useSelector } from "react-redux";

const App = () => {
  // const authCtx = useContext(AuthContext)
  const isAuth = useSelector(state => state.auth.isLogged)
  return (
    <>
    <FirstPageDetails/>
     <Switch>
        {/* <Route path="/" exact>
        <Redirect to='/signup'/>
         
        </Route> */}
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
        <Route path="/verify-email">
         <VerificationPage/>
        </Route>
        <Route path="/forgetpassword">
         <ForgetPassword/>
        </Route>
        <Route exact path='/'>
          {isAuth && <Redirect to={"/add-expense"}/>}
        </Route>
        <Route path="/add-expense">
         {isAuth && <AddExpense/>}
         {!isAuth && <Redirect to='/login'/> }
        </Route>
        </Switch>
    </>
  );
};

export default App;
