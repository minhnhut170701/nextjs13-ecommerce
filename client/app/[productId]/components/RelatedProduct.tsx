import React from 'react'
import Image,{ StaticImageData } from 'next/image'
import img1 from "../../../images/product/product-1.jpg"
import img2 from "../../../images/product/product-2.jpg"
import img3 from "../../../images/product/product-3.jpg"
import img4 from "../../../images/product/product-4.jpg"
import img5 from "../../../images/product/product-5.jpg"
import img6 from "../../../images/product/product-6.jpg"

interface Product  {
  id: string,
  img: StaticImageData,
  name: string,
  price: number
}


function RelatedProduct() {
  const data: Product[] = [
    {id:"1", img: img1, name: 'product1', price: 300},
    {id:"2", img: img2, name: 'product1', price: 300},
    {id:"3", img: img3, name: 'product1', price: 300},
    {id:"4", img: img4, name: 'product1', price: 300},
  ]
  
  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <Image src={item.img} alt={item.name} width={300} height={300} className='w-[300px] h-[300px]' />
          <div className='flex items-center mt-3 justify-between'>
            <h3 className='text-sm font-semibold uppercase'>{item.name}</h3>
            <p>${item.price}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default RelatedProduct
