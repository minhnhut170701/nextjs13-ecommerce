import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-20 bg-white w-full h-[300px] p-6 border'>
      <div className='w-[90%] mx-auto mt-14 flex justify-around'>
        <section className='space-y-5'>
          <h2 className='text-xl uppercase font-semibold'>Company</h2>
          <p>Find a location nearest you. See Our Stores</p>
          <b>+391 (0)35 2568 4593</b>
          <p>hello@domain.com</p>
        </section>
        <ul className='space-y-5'>
          <h2 className='text-xl uppercase font-semibold'>Useful</h2>
          <li><p>New Products</p></li>
          <li><p>Best Sellers</p></li>
          <li><p>Bundle & Save</p></li>
          <li><p>Online Gift Card</p></li>
        </ul>
        <ul className='space-y-5'>
          <h2 className='text-xl uppercase font-semibold'>Information</h2>
          <li><p>New Products</p></li>
          <li><p>Best Sellers</p></li>
          <li><p>Bundle & Save</p></li>
          <li><p>Online Gift Card</p></li>
        </ul>
        <section className='w-[30%] space-y-5'>
          <h2 className='text-xl uppercase font-semibold'>Good email</h2>
          <p>Enter your email below to be the first to know about new collections and product launches.</p>
          <form>
            <input type='text' className='p-4 border outline-none' placeholder='Enter your email address'/>
            <button className='p-4 bg-black text-white'>Đăng Ký</button>
          </form>
        </section>
      </div>
    </footer>
  )
}

export default Footer
