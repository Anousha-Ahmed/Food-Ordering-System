import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/slices/cartSlice';
import authReducer from '../redux/slices/authSlice'

const store = configureStore({
    reducer : {
        cart : cartReducer,
        auth : authReducer,
    }
})

export default store;