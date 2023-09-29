import userReducer from './slides/userSlide'

export const store = configureStore({
    reducer: {
        user: userReducer
    },
})