"use client";
import React, { useEffect, useState } from "react";
import Product from "../../../components/Product";
import { useSearchParams } from "next/navigation";

const ProductSearch = ({ data }: any) => {
  const [productList, setProductList] = useState([]);

  const searchParams = useSearchParams();

  const search = searchParams.get("searchText");
  const range = searchParams.get("range");

  useEffect(() => {
    setProductList(data);
  }, [search, range]);

  return (
    <div>
      <Product data={productList} />
    </div>
  );
};

export default ProductSearch;
