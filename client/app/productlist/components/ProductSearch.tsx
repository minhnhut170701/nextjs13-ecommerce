"use client";
import React, { useEffect, useState } from "react";
import Product from "../../../components/Product";

const ProductSearch = ({ data, searchParams }: any) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(data);
    console.log("data nhận: ", searchParams);
  }, [searchParams]);

  return (
    <div>
      <Product data={productList} />
    </div>
  );
};

export default ProductSearch;
