

type CartType = {
  productName: string,
  banner: string,
  price: number,
  qty: number,
}

// get list item in cart
const fetchItemCart = async (userId: string) =>{
  const respone = await fetch(`https://nextjs13-ecommerce.onrender.com/api/cart/${userId}`)
  const jsonen = await respone.json()
  return jsonen
}

// add to cart
const fetchAdd = async (cartData: CartType, userId: string) =>{
  const respone = await fetch(`https://nextjs13-ecommerce.onrender.com/api/cart/addItem/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartData),
  })
  const jsonen = await respone.json()

  return jsonen
  
}

// delete item cart
const fetchRemoveItem = async (cartId: string) =>{
  const respone = await fetch(`https://nextjs13-ecommerce.onrender.com/api/cart/deleteItem/${cartId}`, {
    method: 'DELETE',
  })
  const jsonen = await respone.json()
  return jsonen
}


// increament item cart
const fetchIncrementItem = async (cartId: string) =>{
  const respone = await fetch(`https://nextjs13-ecommerce.onrender.com/api/cart/increment/${cartId}`, {
    method: 'PUT',
  })
  const jsonen = await respone.json()
  return jsonen
}
// decrement item cart
const fetchDecrementItem = async (cartId: string) =>{
  const respone = await fetch(`https://nextjs13-ecommerce.onrender.com/api/cart/decrement/${cartId}`, {
    method: 'PUT',
  })
  const jsonen = await respone.json()
  return jsonen
}

// clean item cart
const fetchCleanItem = async (userId: string) =>{
  const respone = await fetch(`https://nextjs13-ecommerce.onrender.com/api/cart/clearCart/${userId}`, {
    method: 'POST',
  })
  const jsonen = await respone.json()
  return jsonen
}


export const CartService = {
  fetchAdd,
  fetchItemCart,
  fetchRemoveItem,
  fetchIncrementItem,
  fetchDecrementItem,
  fetchCleanItem
}