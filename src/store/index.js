import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';  // Removed './store/'
import cartReducer from './slices/cartSlice';         // Removed './store/'
import wishListReducer from './slices/wishListSlice'; // Removed './store/'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishItems: wishListReducer,
  },
});