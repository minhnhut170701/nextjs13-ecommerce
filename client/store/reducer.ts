import {configureStore } from "@reduxjs/toolkit";
import CartSlice from "../feature/Cart/CartSlice";
import UserSlice from "../feature/User/UserSlice";
import CommentSlice from "../feature/Comment/CommentSlice";
import OrderSlice from "../feature/Order/OrderSlice";


export const store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
    comment: CommentSlice,
    order: OrderSlice
  },
});


