import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./UpdateProfile.css";
import AuthContext from "../../../store/auth-context";
const UpdateProfile = () => {
  const nameInputRef = useRef();
  const photoInputref = useRef();
  const authCtx = useContext(AuthContext)
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoInputref.current.value;
 
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAf4kJs4dH3tVxzeyXGwmfWZhJpArbmmUA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>{
        console.log("profile updated")
    });
      
    
  };
  return (
    <>
      <div className="welcome">
        <p>Winner never quite , quitter never win</p>
        <button>
          Your profile is 64% complete. A complete profile has higher chance of landing a job
          <Link to="updateprofile"> Complete now </Link>
        </button>

        <hr />
      </div>
      <div className="update">
        <h1>Contact Details</h1>
        <button className="cancel">Cancel</button>
        <form onSubmit={submitHandler} className="update-form">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          <label htmlFor="name">Profile Photo Url</label>
          <input type="url" id="photo" ref={photoInputref} />
          <button>Update</button>
        </form>
      </div>
      <hr />
    </>
  );
};

export default UpdateProfile;
