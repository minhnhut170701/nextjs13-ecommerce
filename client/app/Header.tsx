'use client';
import React, {useEffect, useState, useRef} from 'react'
import {VscSearch} from "react-icons/vsc"
import {FiUser, FiShoppingCart} from "react-icons/fi"
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../feature/User/UserSlice';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify'

const Header = () => {
  const [headerFixed, setHeaderFixed] = useState('relative')
  const {user} = useSelector((state: any) => state.user)
  const [userName, setUserName] = useState(null)
  const route = useRouter()
  const dispatch = useDispatch()
  const ref: any = useRef()
  const handleWindowResize = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 50 ? setHeaderFixed('fixed') : setHeaderFixed('relative');
    }
  }

  useEffect(() =>{
    window.addEventListener('scroll', handleWindowResize);
    return () => {
      window.removeEventListener('scroll', handleWindowResize);
    };
  }, [])

  useEffect(() =>{
    if(ref.current){
      if(user?.email){
        setUserName(user.email)
        toast.success("Đăng nhập thành công")
      }
    }
   ref.current = false
    
  }, [user])

  const handleLogout = () =>{
    dispatch(logout())
    route.push('/authenticate')
  }
  ref.current = true
  return (
    <header className={`flex justify-between p-6 bg-white shadow-xl z-50 w-full ${headerFixed}`}>
      <ToastContainer />
      <h1 className='text-3xl font-bold uppercase text-center w-[20%]'> <Link href='/' >Logo</Link></h1>
      <nav className='w-[80%] flex justify-between items-center'>
        <ul className='flex space-x-10'>
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
          
        </ul>
        <ul className='flex space-x-4'>
          <li className='flex space-x-2 items-center'>
            <VscSearch />
            <span>Search</span>
           </li>
          <li>
            {userName ? 
              <button  className='flex space-x-2 items-center' onClick={handleLogout}>
                <FiUser />
                <span>{userName}</span>
              </button>
            : 
              <Link href='/authenticate' className='flex space-x-2 items-center'>
                <FiUser />
                <span>Account</span>
              </Link>
            }
           
          </li>
          <li>
            <Link href='/cart' className='flex space-x-2 items-center'>
              <FiShoppingCart />
              <span>Cart</span>
            </Link>  
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header