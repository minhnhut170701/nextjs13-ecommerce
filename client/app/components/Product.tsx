'use client'
import React, {useState, useEffect} from 'react'
import ListProductHome from './ListProductHome'


const Product = ({data}: any) => {
  const [product, setProduct] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);
  const totalProduct = product.length
  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() =>{
    setProduct(data)
  }, [data])


  return (
    <section>
          <ListProductHome product={currentPosts} />
          <div style={{background: 'white', color: 'black'}} className="btn-group w-full flex justify-center items-center mt-10">
            {pageNumbers.map(number => (
              <button key={number} className="btn" style={{background: 'white', color: 'black', borderRadius: 0}}
              onClick={() => paginate(number)}>
                  {number}
              </button>
            ))}
          </div>
    </section>
  )
}

export default Product