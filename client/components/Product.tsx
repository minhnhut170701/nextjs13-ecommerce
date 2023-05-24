"use client";
import React, { useState, useEffect } from "react";
import ListProductHome from "./ListProductHome";

const Product = ({ data }: any) => {
  const [product, setProduct] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);
  const totalProduct = product.length;
  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  let pageNumbers: any = [];

  for (let i = 1; i <= Math.ceil(totalProduct / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setProduct(data);
    setCurrentPage(1);
    setPostPerPage(6);
  }, [data]);

  return (
    <section>
      <ListProductHome product={currentPosts} />
      <div className="btn-group w-full flex justify-center items-center mt-10">
        {pageNumbers.map((number: any) => (
          <button
            key={number}
            className={
              currentPage === number
                ? "btn bg-red-500 hover:bg-red-500"
                : "btn btn-outline-secondary"
            }
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Product;
