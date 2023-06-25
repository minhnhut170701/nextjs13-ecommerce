
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  isSuccess: false,
};


const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers:{
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
 
 
})

export const { setSuccess } = OrderSlice.actions;

export default OrderSlice.reducer