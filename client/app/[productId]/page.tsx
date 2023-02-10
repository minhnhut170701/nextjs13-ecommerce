import React from 'react'
import ProductDetail from './components/ProductDetail'
import ProductInfor from './components/ProductInfor'
import RelatedProduct from './components/RelatedProduct' 
import axios from 'axios'
import { ProductDetailProps } from '../../typing'

type Pageprops ={
  params:{
    productId: string
  }
}
type ProductProps = {
      _id: string,
      productName: string,
      price: number,
      banner: Array<string>,
      category: string,
      tag: Array<string>,
      passForProduct: string,
      reviewer: Array<object>,
      infor: Array<object>
      description: string,
      qty: number
}

async function getProductDetail(productSlug: string) {
  const res = await fetch(`http://localhost:3003/api/product/${productSlug}`)
  if (!res.ok) {
    console.log('Failed to fetch data');
  }

  const product: ProductProps = await res.json();
  return product
}

const ProductDetailPage = async ({params: { productId }}: Pageprops) => {
  const product = await getProductDetail(productId)
  return (  
    <div className='p-6 w-[90%] mx-auto'>
      {/* INFO: detail product */}
      <div>
        <ProductDetail productData={product} productName={product.productName} price={product.price} banner={product.banner}
        category={product.category} tag={product.tag} passForProduct={product.passForProduct} description={product.description} qty={product.qty} />
      </div>
      {/* INFO: infor and review product */}
      <div>
        <ProductInfor description={product.description} infor={product.infor} reviewer={product.reviewer} />
      </div>
      {/* INFO: related product */}
      <h2 className='text-xl font-semibold uppercase mt-28'>Sản phẩm liên quan</h2>
      <div className='mt-5 flex justify-around space-x-2'>
        <RelatedProduct />
      </div>
    </div>

  )
}

export async function generateStaticParams(){
  const res = await fetch(`http://localhost:3003/api/product/`)
  if (!res.ok) {
    console.log('Failed to fetch data');
  }

  const product: ProductDetailProps[] = await res.json();
  return product.map(item => ({
    productId: item.slug
  }))
}

export default ProductDetailPage