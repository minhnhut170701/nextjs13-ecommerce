'use client'
import React,{useState, useEffect, useRef} from 'react'
import {FcGoogle} from "react-icons/fc"
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { login } from '../../../feature/User/UserSlice'
import { toast, ToastContainer } from 'react-toastify'
import { UserService } from '../../../feature/User/UserService'

type LoginUserProps ={
  email: string,
  password: string
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const ref: any = useRef()
  const route = useRouter()
  const {user, isSuccess, isError, message} = useSelector((state: any) => state.user)
  const [loginUser, setLoginUser] = useState<LoginUserProps>({
    email: '',
    password: '',
  })


  useEffect(() =>{
    if(isError){
      toast.error('Tài khoản hoặc mật khẩu sai')
    }
    if(isSuccess && user){
      route.push('/')
    }
    if(ref.current){
      if(!user){
        toast.success('Đã đăng xuất')
      }
    }
    ref.current = false

  },[dispatch, user, isSuccess, isError])

  const {email, password} = loginUser
  const handleChange = (e: any) =>{
    setLoginUser((prev) => ({
      ...prev,
      [e.target.name] : e.target.value,
    }))
  }

  const handleSubmit = async (e: any) =>{
    e.preventDefault()
    const userData = {
      email,
      password
    }
    try{
      const res = await UserService.logInUser(userData)
      if(res){
        dispatch(login(userData))
      }
    }catch(error){
      toast.error('Tài khoản hoặc mật khẩu sai')
    }
  }

  ref.current = true
  
  return (
    <div className='flex flex-col items-center justify-center h-full w-[70%] mx-auto'>
      <ToastContainer />
      <aside>
        <h2 className='text-3xl font-semibold uppercase text-center'>Wellcome, You</h2>
        <p>Wellcome back! Please enter you detail</p>
      </aside>
      <form className='mt-5'>
        <input type='email' className='p-2 border-b w-full outline-none' placeholder='Email' name='email' onChange={handleChange} required  />
        <input type='password' className='p-2 border-b w-full mt-5 outline-none' placeholder='Password' name='password' required 
        onChange={handleChange}  />
        <section className='mt-6 flex w-full justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <input type='checkbox' name='remember' />
            <label htmlFor='remember'>Remember me</label>
          </div>
          <button className='font-semibold underline'>Forgot password</button>
        </section>
        <button type='submit' className='mt-8 w-full p-4 bg-black rounded-xl text-white font-semibold uppercase'
        onClick={handleSubmit}>
          Login
        </button>
      </form>
      {/* line or */}
      <div className="flex w-full items-center justify-center mt-5">
        <div className='w-[20%] h-[2px] bg-gray-200' />
        <span className='mr-2 ml-2 text-[12px]'>OR</span>
        <div className='w-[20%] h-[2px] bg-gray-200' />
      </div>

      <button className=' flex text-xl font-semibold space-x-2 p-2 border-2 w-[60%] items-center justify-center mt-6'>
        <span><FcGoogle /></span>
        <span className='text-[12px]'>Login with google</span>
      </button>

      <aside className='mt-10'>
        <span className='mr-2'>Don't have an account?</span>
        <Link href='/authenticate/signup'><span className='font-semibold'>Sign up for here</span></Link>
      </aside>
    </div>
  )
}

export default LoginForm