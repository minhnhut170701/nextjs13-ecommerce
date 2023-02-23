import React from "react";
import ProductDetail from "../../../components/ProductDetail";
import ProductInfor from "../../../components/ProductInfor";
import RelatedProduct from "../../../components/RelatedProduct";
import { notFound } from "next/navigation";

type Pageprops = {
  params: {
    productSlug: string;
  };
};

type ProductDetailProps = {
  _id: string;
  productName: string;
  price: number;
  banner: Array<string>;
  category: string;
  tag: Array<string>;
  passForProduct: string;
  infor: Array<object>;
  description: string;
  slug: string;
  categotySlug: string;
  reviewer: Array<Object>;
  qty: number;
};

async function getProductDetail(productSlug: string) {
  const res = await fetch(
    `http://localhost:3003/api/product/detail/${productSlug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    console.log("lỗi");
  }
  const product: any = await res.json();

  return product;
}

async function getProduct() {
  const res = await fetch(`http://localhost:3003/api/product`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    console.log("lỗi");
  }
  const product: any = await res.json();

  return product;
}

const ProductDetailPage = async ({ params }: any) => {
  const { productSlug } = params;
  const product = await getProductDetail(productSlug);

  if (!product) {
    notFound();
  }
  return (
    <div className="p-6 w-[90%] mx-auto">
      {/* INFO: detail product */}
      <div>
        <ProductDetail
          productData={product}
          productName={product.productName}
          price={product.price}
          banner={product.banner}
          category={product.category}
          tag={product.tag}
          passForProduct={product.passForProduct}
          description={product.description}
          qty={product.qty}
        />
      </div>
      {/* INFO: infor and review product */}
      <div>
        <ProductInfor
          description={product.description}
          infor={product.infor}
          reviewer={product.reviewer}
          Id={product._id}
        />
      </div>
      {/* INFO: related product */}
      <h2 className="text-xl font-semibold uppercase mt-28">
        Sản phẩm liên quan
      </h2>
      <div className="mt-5 flex justify-around space-x-2">
        <RelatedProduct />
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const res = await getProduct();

  return res.map((item: any) => ({
    productSlug: `${item.slug}`,
  }));
}

export default ProductDetailPage;
