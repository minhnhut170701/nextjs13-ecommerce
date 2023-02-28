import { CartService } from './CartService';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Product = {
  productName: string,
  banner: string,
  price: number,
  qty: number,
};

type CartState = {
  cart: Array<Product>,
  isSuccess: boolean,
  isLoading: boolean,
  isError: boolean,
  message: string
};

type AddToCartType = {
  cartData: Product,
  userId: string,
}


const initialState: CartState = {
  cart: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: ""
};


export const addToCart = createAsyncThunk('addtoCart', async({cartData, userId}: AddToCartType, thunk) =>{
  try {
    return await CartService.fetchAdd(cartData, userId)
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
export const getItemCart = createAsyncThunk('getItemCart', async(userId: string, thunk) =>{
  try {
    return await CartService.fetchItemCart(userId)
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})

export const deleteItemCart = createAsyncThunk('deleteItemCart', async(cartId: string, thunk) =>{
  try {
    return await CartService.fetchRemoveItem(cartId)
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
export const incrementItemCart = createAsyncThunk('incrementItemCart', async(cartId: string, thunk) =>{
  try {
    return await CartService.fetchIncrementItem(cartId)
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
export const decrementItemCart = createAsyncThunk('decrementItemCart', async(cartId: string, thunk) =>{
  try {
    return await CartService.fetchDecrementItem(cartId)
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
export const cleanItemCart = createAsyncThunk('cleantItemCart', async(userId: string, thunk) =>{
  try {
    return await CartService.fetchCleanItem(userId)
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    
  },
  extraReducers: (builder) =>{
    builder
    .addCase(addToCart.pending, (state) =>{
      state.isLoading = true
    })
    .addCase(addToCart.fulfilled, (state, action) =>{
      state.isLoading = false,
      state.isSuccess = true,
      state.message = action.payload
    })
    .addCase(addToCart.rejected, (state: any, action) =>{
      state.isLoading = false,
      state.isError = true,
      state.message = action.payload
    })
    .addCase(getItemCart.pending, (state) =>{
      state.isLoading = true
    })
    .addCase(getItemCart.fulfilled, (state, action) =>{
      state.isLoading = false,
      state.isSuccess = true,
      state.cart = action.payload
    })
    .addCase(getItemCart.rejected, (state: any, action) =>{
      state.isLoading = false,
      state.isError = true,
      state.message = action.payload
    })
    .addCase(deleteItemCart.pending, (state) =>{
      state.isLoading = true
    })
    .addCase(deleteItemCart.fulfilled, (state, action) =>{
      state.isLoading = false,
      state.isSuccess = true,
      state.message = action.payload
    })
    .addCase(deleteItemCart.rejected, (state: any, action) =>{
      state.isLoading = false,
      state.isError = true,
      state.message = action.payload
    })
  }
 
})

export default CartSlice.reducer