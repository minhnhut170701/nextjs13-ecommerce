import { createSlice } from "@reduxjs/toolkit";

type Product = {
  _id: string,
  productName: string,
  banner: Array<string>,
  price: number,
  qty: number,
  total: number,
  discount: string,
};

type CartState = {
  cart: Array<Product>,
  sumTotal: number
};

type AddToCartAction = {
  type: string,
  payload: Product,
};


const initialState: CartState = {
  cart: [],
  sumTotal: 0
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
        state.sumTotal += product.total
      } else {
        state.cart[productIndex].qty++;
        state.cart[productIndex].total = state.cart[productIndex].price * state.cart[productIndex].qty;
        state.sumTotal += product.total
      }
    },
    incrementQuantity: (state: any, action: AddToCartAction) => {
      const product = action.payload;
      const productIndex = state.cart.findIndex((p: { _id: string; }) => p._id === product._id);
      state.cart[productIndex].qty++;
      state.cart[productIndex].total = state.cart[productIndex].price * state.cart[productIndex].qty;
      state.sumTotal += product.total
    },
    decrementQuantity: (state:any, action: AddToCartAction) => {
      const product = action.payload;
      const productIndex = state.cart.findIndex((p: { _id: string; }) => p._id === product._id);
      if (state.cart[productIndex].qty === 1) {
        state.cart[productIndex].qty = 1;
      } else {
        state.cart[productIndex].qty--;
        state.sumTotal -= product.total
      }
      state.cart[productIndex].total = state.cart[productIndex].price * state.cart[productIndex].qty;
    },
    removeItem: (state: any, action: AddToCartAction) => {
      const product = action.payload;
      const removeItem = state.cart.filter((item: any) => item._id !== product._id);
      state.cart = removeItem;
    },
    applyDiscount: (state:any, action: AddToCartAction) => {
      const product = action.payload;
      if(product.discount === 'lucas'){
        state.sumTotal = state.sumTotal *((100 - 10) / 100)
      }
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