import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
    name : "cart",
    initialState,

    reducers:{
        addToCart : (state,action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find((i) => i.id === item.id);
            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                state.cartItems.push({
                    ...item , quantity:1,
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart : (state,action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        increaseQuantity : (state,action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if(item){
                item.quantity++;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreaseQuantity : (state,action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if(item && item.quantity > 1){
                item.quantity--;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        },
        
    },
});
export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;