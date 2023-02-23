import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommentService } from "./CommentService";

type Comment = {
  data: Array<Object> | [],
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string,
};


const initialState: Comment = {
  data: [],
  isError:false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const addComment = createAsyncThunk('comment/add', async ({commentData, productId} : any, thunkAPI) => {
  try {
    return await CommentService.fetchCommentData(commentData, productId)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log('lỗi nè: ', message)
    return thunkAPI.rejectWithValue(message);
  }
});

export const getComment = createAsyncThunk('comment/getById', async ({productId}:any, thunkAPI) => {
  try {
    return await CommentService.getComment(productId)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log('lỗi nè: ', message)
    return thunkAPI.rejectWithValue(message);
  }
});

const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
    .addCase(addComment.pending, (state: any) =>{
      state.isLoading = true
  })
  .addCase(addComment.fulfilled, (state: any, action) =>{
      state.isLoading = false
      state.isSuccess = true
      state.data = action.payload
  })
  .addCase(addComment.rejected, (state: any, action) =>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
  })
    .addCase(getComment.pending, (state: any) =>{
      state.isLoading = true
      })
    .addCase(getComment.fulfilled, (state: any, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
    })
    .addCase(getComment.rejected, (state: any, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
  }
})


export default CommentSlice.reducer
