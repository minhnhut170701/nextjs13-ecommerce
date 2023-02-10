import axios from "axios";

const registerUser = async (userData: any) =>{
  try {
    const res = await axios.post('http://localhost:3003/api/user/register', userData)
    if(res.data){
      if(typeof window !== "undefined"){
        localStorage.setItem('client', JSON.stringify(res.data))
      } 
    }
    return res.data
  } catch (error: any) {
    console.log('Mat khau khong dung')
  }
}

const logInUser = async (userData: any) =>{
  
    const res = await axios.post('http://localhost:3003/api/user/login', userData)
    if(res.data){
      if(typeof window !== "undefined"){
        localStorage.setItem('client', JSON.stringify(res.data))
      } 
    }
    return res.data
  
}

const logout = () =>{
  if(typeof window !== "undefined"){
    localStorage.removeItem('client')
  }
  
}
export const UserService = {
  registerUser,
  logInUser,
  logout
}