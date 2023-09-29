import userReducer from './slides/userSlide'
import transactionReducer from './slides/transactionSlide'

export const store = configureStore({
    reducer: {
        totalPrice: transactionReducer,
        user: userReducer
    },
})