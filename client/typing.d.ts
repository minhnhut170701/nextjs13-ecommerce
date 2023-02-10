export type ProductDetailProps = {
  _id: string,
  productName: string,
  price: number,
  banner: Array<string>,
  category: string,
  tag: Array<string>,
  passForProduct: string,
  infor: Array<object>
  description: string,
  slug: string,
  categotySlug: string,
  qty: number
}

export type ProductProps = {
  product: [
    {
      _id: string,
      productName: string,
      price: number,
      banner: Array<string>,
      category: string,
      tag: Array<string>,
      passForProduct: string,
      infor: Array<object>
      description: string,
      slug: string,
      categotySlug: string,
      qty: number
    }
  ]
  
}