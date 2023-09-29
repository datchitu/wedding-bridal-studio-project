import { createSlice } from '@reduxjs/toolkit';

// let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
const initialState = {
    totalPrice: ''
}

export const transactionSlice = createSlice({
    name: 'totalPrice',
    initialState,
    reducers: {
        
    },
})

export const {  } = transactionSlice.actions

export default transactionSlice.reducer
