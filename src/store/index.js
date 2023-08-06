import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenses from './ExpenseSlice'

const store = configureStore({
    reducer :{
        auth:authReducer,
        expenses: expenses,
       
    }
})
export default store;