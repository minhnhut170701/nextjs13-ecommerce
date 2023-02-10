import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Product = {
  _id: string,
  productName: string,
  banner: Array<string>,
  price: number,
  qty: number,
  total: number
};

type CartState = {
  cart: Array<Product>
};

type AddToCartAction = {
  type: string,
  payload: Product
};


const initialState: CartState = {
  cart: []
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addToCart: (state: any, action: AddToCartAction) => {
      const product = action.payload ;
      const productIndex = state.cart.findIndex((p: { _id: string; }) => p._id === product._id);
      if (productIndex === -1) {
        state.cart.push({...product, qty: product.qty, total: product.total});
      } else {
        state.cart[productIndex].qty++;
        state.cart[productIndex].total = state.cart[productIndex].price * state.cart[productIndex].qty;
      }
    },
    incrementQuantity: (state: any, action: AddToCartAction) => {
      const product = action.payload;
      const productIndex = state.cart.findIndex((p: { _id: string; }) => p._id === product._id);
      state.cart[productIndex].qty++;
      state.cart[productIndex].total = state.cart[productIndex].price * state.cart[productIndex].qty;
    },
    decrementQuantity: (state:any, action: AddToCartAction) => {
      const product = action.payload;
      const productIndex = state.cart.findIndex((p: { _id: string; }) => p._id === product._id);
      if (state.cart[productIndex].qty === 1) {
        state.cart[productIndex].qty = 1;
      } else {
        state.cart[productIndex].qty--;
      }
      state.cart[productIndex].total = state.cart[productIndex].price * state.cart[productIndex].qty;
    },
    removeItem: (state: any, action: AddToCartAction) => {
      const product = action.payload;
      const removeItem = state.cart.filter((item: any) => item._id !== product._id);
      state.cart = removeItem;
    },
  },
 
})
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = CartSlice.actions;
export default CartSlice.reducer