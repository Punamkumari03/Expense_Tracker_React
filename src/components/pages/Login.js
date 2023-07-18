import React, { useContext, useRef } from "react";
import './SignUp.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/auth-context";


const Login = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
   

    const submitHandler = (e) =>{
      e.preventDefault()
      const enterdEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
   
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAf4kJs4dH3tVxzeyXGwmfWZhJpArbmmUA',{
        method:'POST',
        body:JSON.stringify({
            email: enterdEmail,
            password: enteredPassword,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
          }, })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Authentication failed";

                throw new Error(errorMessage);
    
              });
            }
          }).then((data)=>{
             authCtx.login(data.idToken);
            //  history.replace('/welcome')
            history.replace('/verify-email')
          }).catch((err)=>{
            alert(err.message)
          });
        
    }
  return (
    <>
      <div className="form-section">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className="control">
            <input type="email" id="email" placeholder="Email" ref={emailInputRef}required />
          </div>
          <div className="control">
            <input
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className="actions">
            <button>Login</button>
          </div>
        </form>
        <br/>
        <div className="action">
             <button className="btn"> Don't Have an account?
             <Link to='/signup'>
              Signup </Link></button>
        </div>
      </div>
    </>
  );
};

export default Login;
