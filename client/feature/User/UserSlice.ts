import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "./UserService";

type User = {
  userName: string,
  email:string,
  isAdmin: boolean
}

type UserState = {
  user: Array<User> | null,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string,
};

const user = typeof window !== "undefined" ? localStorage.getItem('client'): null

const initialState: UserState = {
  user: user ? JSON.parse(user) : null,
  isError:false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await UserService.registerUser(userData);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) =>{
  try{
      return await UserService.logInUser(userData)
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
  })
  .addCase(login.pending, (state) =>{
      state.isLoading = true
  })
  .addCase(login.fulfilled, (state, action) =>{
    state.isLoading = false
    state.user = action.payload
    state.isSuccess = true
    state.isError = false
  })
  .addCase(login.rejected, (state: any, action) =>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
  })
  }
})


export default UserSlice.reducer
