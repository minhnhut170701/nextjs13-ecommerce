import React from 'react'

import Image from 'next/image'
import CartDetail from './components/CartDetail'

function CartPage() {
  return (
    <main>
      <div className='bg-gray-200 p-4'>
        <h2 className='text-xl font-semibold w-[85%] mx-auto uppercase'>Cart</h2>
      </div>
      <CartDetail />
    </main>
    
  )
}

export default CartPage
