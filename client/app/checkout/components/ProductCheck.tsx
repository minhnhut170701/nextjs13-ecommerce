'use client'
import React from 'react'
import Image from 'next/image'
import {FaShippingFast} from "react-icons/fa"

const ProductCheck = () => {
  return (
    <div className='w-[60%] bg-white p-6 rounded-lg shadow-lg'>
      <aside className='w-full flex justify-between items-center'>
         <h2 className='text-lg uppercase'>Cart</h2>
         <p className='text-lg text-blue-500'>View All</p>
      </aside>
      <ul className='mt-10'>
        <li className=' flex space-x-10 w-full pb-5 pt-5 border-b-2'>
            <Image src='https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80' alt='Product name' width={80} height={80} className='w-[100px] h-[100px]' />
            <div className='space-y-2'>
                <p className='text-gray-400'>Thể loại</p>
                <h3 className='pb-4 text-xl font-semibold'>Tên sản phẩm</h3>
                <div className='flex space-x-4 items-center w-[300px]'>
                  <aside className='flex space-x-2 items-center'>
                      <span className='font-semibold'>SKU:</span>
                      <span className='text-[12px] text-blue-400 underline pt-[2px]'>SKU-892</span>
                  </aside>
                  <aside className='flex space-x-2 items-center'>
                     <span className='font-semibold'>Nhà cung cấp:</span>
                     <span className='text-[12px] pt-[2px] text-blue-400 underline'>Lucas Shop</span>
                  </aside>
                </div>
                <button className='flex space-x-2 bg-green-100 text-green-400 items-center p-2 pr-4 pl-4'>
                   <span>Free Ship</span>
                  <FaShippingFast />
                </button>
            </div>
            <div className='w-[200px] flex flex-col  border-l-2'>
                <div className='flex justify-around items-center w-[70%] border mx-auto rounded-md'>
                    <button className='border-r-2 w-[20%] h-full'>-</button>
                    <input type='text' disabled value={1} className='w-[20%] p-2 text-center bg-transparent text-[12px]' />
                    <button className='border-l-2 w-[20%] h-full'>+</button>
                </div>
                <div className='w-[70%] mx-auto pt-14'>
                  <span className='line-through text-gray-400 text-xl'>$300</span>
                  <p className='font-semibold text-xl'>$200</p>
                </div>
            </div>
        </li>
        

      </ul>
    </div>
  )
}

export default ProductCheck