import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../../store/auth-context'

const ForgetPassword = () => {
    
    const emailInputRef = useRef()
    // const authCtx = useContext(AuthContext)
    const submitHandler = (e) =>{
        e.preventDefault()
        alert("you may have received an email with reset link");
    console.log(emailInputRef.current.value);
       
        const enterdEmail = emailInputRef.current.value;
     
     
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAf4kJs4dH3tVxzeyXGwmfWZhJpArbmmUA',{
          method:'POST',
          body:JSON.stringify({
            requestType: "PASSWORD_RESET",
              email: enterdEmail,
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
              console.log(data)
              //  history.replace('/welcome')
             
            }).catch((err)=>{
              alert(err.message)
            });
          
      }
  return (
   <>
     <div className="form-section">
       <p>Enter the email with which you have registered </p>
        <form onSubmit={submitHandler}>
          <div className="control">
            <input type="email" id="email" placeholder="Email" ref={emailInputRef}required />
          </div>
       
        
          <div className="actions">
            <button>Send Link</button>
          </div>
         
       
        </form>
        <br/>
        <div className="action">
             <button className="btn">Allready a user?
             <Link to='/login'>
              
              login </Link></button>
        </div>
      </div>
   </>
  )
}

export default ForgetPassword
