import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    showPremium : localStorage.getItem('isPremiun') === true,
    showDark: localStorage.getItem('dark or not')=== 'true',
    receivedData: {}
};

const expenseSlice = createSlice({
    name:'expense',
    initialState: initialExpenseState,
    reducers:{
        premium(state){
            state.showPremium = true;
            localStorage.setItem('isPremium',true);
        },
        notPremium(state){
            state.showPremium = false;
            localStorage.setItem('isPremium',false)
        },
        receivedData(state,action){
            state.receivedData = action.payload;
        },
        toogleDark(state){
            state.showDark = !state.showDark;
            localStorage.setItem('dark or not',state.showDark);
            window.location.reload();
        }
    },
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;