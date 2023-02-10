import {configureStore } from "@reduxjs/toolkit";
import CartSlice from "../feature/Cart/CartSlice";
import UserSlice from "../feature/User/UserSlice";


export const store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice
  },
});


