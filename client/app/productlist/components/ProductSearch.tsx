"use client";
import React, { useEffect, useState } from "react";
import Product from "../../../components/Product";

const ProductSearch = ({ data, searchParams, range }: any) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(data);
  }, [searchParams, range]);

  return (
    <div>
      <Product data={productList} />
    </div>
  );
};

export default ProductSearch;
