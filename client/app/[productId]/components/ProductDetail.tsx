'use client'
import React, { useEffect, useState } from 'react'
import {AiFillStar, AiOutlineStar} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addToCart } from '../../../feature/Cart/CartSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface ProductDetailType {
      productName: string,
      price: number,
      banner: Array<string>,
      category: string,
      tag: Array<string>,
      passForProduct: string,
      description: string,
      qty: number,
      productData: any
}

type Product = {
  _id: string,
  productName: string,
  banner: Array<string>,
  price: number,
  qty: number,
  total: number
};

const ProductDetail = ({productName, price, banner, category, tag, passForProduct, description, qty, productData}: ProductDetailType) => {
  const dispatch = useDispatch()
  const route = useRouter()
  const [countQty, setCountQty] = useState(1)
  const {user} = useSelector((state:  any) => state.user)
  useEffect(() =>{
    setCountQty(countQty <= 0 ? 1 : countQty)
  },[countQty])

  const handleAddToCart = (product : Product, countQty: number) => {
    if(user?.email){
        dispatch(addToCart({
          _id: product._id,
          productName: product.productName,
          banner: product.banner,
          price: product.price,
          qty: countQty,
          total: product.price * countQty
        }));
        route.push('/cart');
    }else{
      toast.warning('Vui lòng đăng nhập')
    }
  }
  
  return (
    <div className='flex space-x-10'>
      <div className='w-[35%] bg-center bg-no-repeat bg-contain h-[500px]' style={{backgroundImage: `url(${banner[0]})`}}>
        {/* <Image src={banner[0]} width={600} height={500} alt={productName} className='w-[600px] h-[500px]' /> */}
      </div>
      <div className='space-y-5 w-[65%]'>
        <h2 className='uppercase text-3xl font-semibold'>{productName}</h2>
        <div className='flex space-x-1 text-yellow-400'>
          <span><AiFillStar /></span>
          <span><AiFillStar /></span>
          <span><AiFillStar /></span>
          <span><AiFillStar /></span>
          <span><AiOutlineStar /></span>
        </div>
        <p>${price}</p>
        <p>{description}</p>
        <div className='flex space-x-10'>
            <div className='flex items-center space-x-5'>
              <button onClick={() => setCountQty(countQty +1)}>+</button>
              <input type='number' className='p-2 pl-4 pr-4 border w-[80px] bg-gray-200 text-center' value={countQty} disabled />
              <button onClick={() => setCountQty(countQty -1)}>-</button>
            </div>
            <button className='uppercase p-4 font-semibold bg-yellow-300' onClick={() => handleAddToCart(productData, countQty)}>Add to cart</button>
        </div>
        <article className='space-y-3'>
          <aside className='flex space-x-4'>
            <h5 className='text-lg font-semibold uppercase'>SKU: </h5>
            <p>{passForProduct}</p>
          </aside>
          <aside className='flex space-x-4'>
            <h5 className='text-lg font-semibold uppercase'>CATEGORY: </h5>
            <p className='uppercase'>{category}</p>
          </aside>
          <aside className='flex space-x-4'>
            <h5 className='text-lg font-semibold uppercase'>TAG: </h5>
            <p>{tag}</p>
          </aside>
        </article>
      </div>
    </div>
  )
}

export default ProductDetail