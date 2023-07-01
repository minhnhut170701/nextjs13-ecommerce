import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "./UserService";

type User = {
  userName: string,
  email:string,
  isAdmin: boolean
}

type UserState = {
  user: Object | null,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string,
  userImg:  string
};

const user = typeof window !== "undefined" ? localStorage.getItem('client'): null

const initialState: UserState = {
  user: user ? JSON.parse(user) : null,
  isError:false,
  isLoading: false,
  isSuccess: false,
  message: '',
  userImg: 'https://images.unsplash.com/photo-1676238641102-24a49ef42493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
}

export const register = createAsyncThunk('auth/register', async ({userData}: any, thunkAPI) => {
  try {
    return await UserService.registerUser(userData);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// login user
export const innerLogin = createAsyncThunk('auth/login', async ({userData}: any, thunkAPI) =>{
  try{
    const res = await UserService.logInUser(userData)
      return res
  }catch(error: any){
      const message = (error.reponse && error.response.data && error.response.data.message)
       || error.message
       || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', 
async () =>{
    await UserService.logout()
})

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
    .addCase(register.pending, (state) =>{
      state.isLoading = true
  })
  .addCase(register.fulfilled, (state, action) =>{
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
  })
  .addCase(register.rejected, (state: any, action) =>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
  })
  .addCase(logout.fulfilled, (state: any) =>{
      state.user = null
      state.isSuccess = false
  })
  .addCase(innerLogin.pending, (state) =>{
      state.isLoading = true
  })
  .addCase(innerLogin.fulfilled, (state, action) =>{
    state.isLoading = false
    state.user = action.payload
    state.isSuccess = true
    state.isError = false
  })
  .addCase(innerLogin.rejected, (state: any, action) =>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
  })
  }
})


export default UserSlice.reducer
