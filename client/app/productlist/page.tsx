import React from 'react'
import { ProductDetailProps } from '../../typing';
import { base64Decode } from '../../utils/encodeParams';
import Product from '../components/Product';
import ProductSearch from './components/ProductSearch';


async function featchDataSearch(searchText: string){
  const searchDecode = base64Decode(searchText)
  const response = await fetch(`http://localhost:3003/api/product/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {revalidate: 0},
    body: JSON.stringify({ searchText: searchDecode }),
  });
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  
  const data: ProductDetailProps[] = await response.json();
  return data
}

async function getData() {
  const res = await fetch('http://localhost:3003/api/product', {cache: 'no-store'});
 
  if (!res.ok) {
    console.log('Failed to fetch data');
  }

  const product: ProductDetailProps[] = await res.json()
  return product
}

const ProductList = async ({searchParams, product} : any) => {
  const dataList = await getData()
  let dataSearch
  if(searchParams.searchText){
    dataSearch = await featchDataSearch(searchParams.searchText)
  }
  

  return (
    <div>
      {searchParams.searchText ? <>
        <ProductSearch data={dataSearch} searchParams={searchParams.searchText}/>
      </>
      :
      <>
       <h1>Product List</h1>
        <Product data={dataList} />
      </>}
       
    </div>
  )
}



export default ProductList