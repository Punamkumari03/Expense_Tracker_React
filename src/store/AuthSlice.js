import { createSlice } from "@reduxjs/toolkit"

const InitialAuthState = {
    token:localStorage.getItem('token'),
    userEmail:localStorage.getItem('email'),
    isLogged:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState:InitialAuthState,
    reducers:{
        login(state,action){
            state.isLogged = true;
            state.token =action.payload.token;
            state.userEmail = action.payload.email;
            localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
        },
        logout(state){
            state.isLogged = false
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('email')
            
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;