import React from 'react'
import PaymentInfo from './components/PaymentInfo'
import ProductCheck from './components/ProductCheck'

const CheckOutPage = () => {
  return (
    <div className='m-w-full'>
      <div className='w-full bg-no-repeat bg-cover bg-center h-[300px]' style={{backgroundImage: "url('https://images.unsplash.com/photo-1439405326854-014607f694d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"}}>
          <div className='flex w-full h-full items-center justify-center'>
              <h2 className='text-3xl text-white font-bold uppercase'>Checkout Page</h2>
          </div>
      </div>
      <div className='w-[80%] mx-auto mt-24 flex justify-between space-x-10'>
          <ProductCheck />
          <PaymentInfo />
      </div>
    </div>
  )
}

export default CheckOutPage