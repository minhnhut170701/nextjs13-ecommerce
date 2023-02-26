import React from "react";
import { ProductDetailProps } from "../../typing";
import { base64Decode } from "../../utils/encodeParams";
import Product from "../../components/Product";
import ProductSearch from "./components/ProductSearch";

async function featchDataSearch(searchText: string, range: string) {
  const searchDecode = base64Decode(searchText);
  const response = await fetch(`http://localhost:3003/api/product/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
    body: JSON.stringify({ searchText: searchDecode, rangePrice: range }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data: ProductDetailProps[] = await response.json();
  return data;
}

async function getData() {
  const res = await fetch("http://localhost:3003/api/product", {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const product: ProductDetailProps[] = await res.json();
  return product;
}

const ProductList = async ({ searchParams, product }: any) => {
  const dataList = await getData();
  let dataSearch;
  if (
    (searchParams.searchText && searchParams.searchText !== undefined) ||
    (searchParams.range && searchParams.range !== undefined)
  ) {
    dataSearch = await featchDataSearch(
      searchParams.searchText,
      searchParams.range
    );
  }
  const decode = base64Decode(searchParams.searchText || "");

  return (
    <div>
      {searchParams.searchText || searchParams.range ? (
        <>
          <aside>
            <h2 className="font-semibold">Tìm kiếm cho: </h2>
            <p>{decode}</p>
          </aside>
          <ProductSearch
            data={dataSearch}
            searchParams={searchParams.searchText}
            range={searchParams.range}
          />
        </>
      ) : (
        <>
          <h1>Product List</h1>
          <Product data={dataList} />
        </>
      )}
    </div>
  );
};

export default ProductList;
