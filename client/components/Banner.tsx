"use client"
import React from 'react'

const Banner = () => {
  
  return (
    <div className='bg-banner-1 bg-no-repeat bg-top bg-cover w-full h-[600px] text-white'>
      <section className='flex items-center justify-center w-[30%] h-full mx-auto'>
        <div className='space-y-5'>
          <h2 className='uppercase text-center text-3xl font-bold'>Shopping Lucas</h2>
          <p className='text-center'>Bạn có thể dễ dàng tìm thấy món đồ yêu thích của mình với một mức giá không thể hài lòng hơn</p>
          <section className='flex items-center justify-center space-x-10'>
            <button className=' bg-white text-black pl-8 pr-8 p-2'>Shop</button>
            <button className=' bg-yellow-500 text-black pl-8 pr-8 p-2'>About</button>
          </section>
        </div>
      </section>
      
    </div>
  )
}

export default Banner