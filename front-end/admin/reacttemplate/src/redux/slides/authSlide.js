import { createSlice } from '@reduxjs/toolkit';

// let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
const initialState = {
    accessToken: '',
    user: {},
    email: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
})

export const {  } = authSlice.actions

export default userSlice.reducer
