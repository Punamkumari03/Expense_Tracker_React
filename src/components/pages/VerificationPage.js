import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useSelector } from "react-redux";

const VerificationPage = () => {
  // const authCtx = useContext(AuthContext);
  const token = useSelector((state)=> state.auth.token);
  const verifyEmail = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAf4kJs4dH3tVxzeyXGwmfWZhJpArbmmUA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Verification sent succesfullly");
          alert("Verification sent succesfullly");
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Authrntication filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div>
      <button style={{ color: "red" }} onClick={verifyEmail}>
        Verify Email ID
      </button>
    </div>
  );
};

export default VerificationPage;
