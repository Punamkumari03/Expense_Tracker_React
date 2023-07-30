import React, { useState } from 'react';
const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token) =>{},
    logout: () =>{},
    userEmail:'',

});

export const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email')
    const[token,setToken] = useState(initialToken)
    const[userEmail,setUserEmail] = useState(initialEmail);

    const userIsLoggedIn = !!token;

    const loginHandler = (token,email)=>{
        setToken(token)
        setUserEmail(email)
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);

    }
    const logoutHandler =()=>{
        setToken(null)
        setUserEmail(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        
    }

    const contextValue = {
        token: token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
        userEmail:userEmail,

    }
    return <AuthContext.Provider value={contextValue}>
    {props.children}
</AuthContext.Provider>

}
 export default AuthContext;