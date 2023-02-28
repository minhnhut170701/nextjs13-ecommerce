"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { BsFillCartFill } from "react-icons/bs";
import "../styles/custom.css";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, getItemCart } from "../feature/Cart/CartSlice";

type Product = {
  _id: string;
  productName: string;
  banner: Array<string>;
  price: number;
  qty: number;
  total: number;
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

const ListProductHome = ({ product }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  const handleAddToCart = (product: any) => {
    if (user?.email) {
      const cartItem = {
        productName: product.productName,
        banner: product.banner[0],
        price: product.price,
        qty: 1,
      };
      dispatch(
        addToCart({
          cartData: cartItem,
          userId: user._id,
        })
      );
      toast.success("Đã thêm vào giỏ hàng");
    } else {
      toast.warning("Vui lòng đăng nhập");
    }
  };

  return (
    <section className="w-full">
      <h2 className="p-4 text-xl font-bold uppercase">Hot</h2>

      <div className="grid grid-cols-3 gap-10">
        <>
          {product.map((product: any) => (
            <div key={product._id} className="w-full">
              <div className="h-[280px] relative product-container overflow-hidden">
                <Link
                  href={`product/${product.slug || "ao-thun-nam-thoi-trang"}`}
                  className="absolute"
                >
                  <Image
                    src={product.banner[0]}
                    alt={product.productName}
                    width={300}
                    height={300}
                    className="object-cover w-[300px] h-[300px]"
                  />
                </Link>
                <button
                  className="bg-yellow-300 p-2 pl-4 pr-4 uppercase text-sm absolute bottom-[7px] left-[25%] right-[25%] cart-product z-20 "
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
              <div className="flex justify-between w-full mt-5">
                <aside className="w-[60%]">
                  <h3 className="text-xl font-semibold uppercase line-clamp-1">
                    {product.productName}
                  </h3>
                  <p>{product.category}</p>
                </aside>
                <aside className="flex flex-col">
                  <p>${product.price}</p>
                  <p className="ml-auto">
                    <BsFillCartFill />
                  </p>
                </aside>
              </div>
            </div>
          ))}
        </>
      </div>
    </section>
  );
};

export default ListProductHome;
