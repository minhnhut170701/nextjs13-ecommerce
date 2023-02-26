import React from "react";
import { notFound } from "next/navigation";
import { ProductDetailProps } from "../../../typing";
import Link from "next/link";
import Image from "next/image";
import { BsFillCartFill } from "react-icons/bs";
import Product from "../../../components/Product";

type Pageprops = {
  params: {
    productSlug: string;
  };
};

async function getProductCategory(productSlug: string) {
  const res = await fetch(
    `http://localhost:3003/api/product/category/${productSlug}`,
    { next: { revalidate: 30 } }
  );
  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const product: ProductDetailProps[] = await res.json();
  return product;
}

const ProductSlug = async ({ params: { productSlug } }: Pageprops) => {
  const data = await getProductCategory(productSlug);

  return (
    <section>
      <Product data={data} />
    </section>
  );
};

// export async function generateStaticParams({
//   params: { productSlug },
// }: Pageprops) {
//   const res = await fetch(
//     `http://localhost:3003/api/product/category/${productSlug}`
//   );
//   if (!res.ok) {
//     console.log("Failed to fetch data");
//   }

//   const product: ProductDetailProps[] = await res.json();
//   return product.map((item) => ({
//     productSlug: item.slug.toString(),
//   }));
// }

export default ProductSlug;
