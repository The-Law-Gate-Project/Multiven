import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../redux/features/modal/modalSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import userReducer from "../redux/features/user/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
