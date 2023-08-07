import { createSlice } from "@reduxjs/toolkit"

const InitialAuthState = {
    token:localStorage.getItem('token'),
    userEmail:localStorage.getItem('email'),
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
}

const authSlice = createSlice({
    name:'auth',
    initialState:InitialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated = true;
            state.token =action.payload.token;
            state.userEmail = action.payload.email;
            localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("isAuthenticated", true);
        },
        logout(state){
            state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
      
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('email')
            
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;