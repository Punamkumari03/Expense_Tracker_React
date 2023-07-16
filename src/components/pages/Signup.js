import React, { useRef } from "react";
import './SignUp.css'


const Signup = () => {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const confirmPasswordInputRef = useRef()

    const submitHandler = (e) =>{
      e.preventDefault()
      const enterdEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enterConfirmPassword = confirmPasswordInputRef.current.value;
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf4kJs4dH3tVxzeyXGwmfWZhJpArbmmUA',{
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
    
               alert(errorMessage)
              });
            }
          }).then((data)=>{
            console.log('user is successfully registered')
          })
        
    }
  return (
    <>
      <div className="form-section">
        <h1>SignUp</h1>
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
          <div className="control">
            <input
              type="password"
              id="C_password"
              placeholder="Confirm password"
              ref={confirmPasswordInputRef}
              required
            />
          </div>
          <div className="actions">
            <button>Sign Up</button>
          </div>
        </form>
        <br/>
        <div className="action">
             <button className="btn">Have an account? Login</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
