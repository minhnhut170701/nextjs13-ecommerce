"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaShippingFast } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../../feature/Cart/CartSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProductCheck = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.user);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const route = useRouter();
  useEffect(() => {
    if (cart) {
      setCartData(cart);
    }
  }, [cart]);

  useEffect(() => {
    if (!user) {
      route.push("/");
    }
  }, []);

  return (
    <div className="w-[60%] bg-white p-6 rounded-lg shadow-lg overflow-y-scroll h-[600px]">
      <aside className="w-full flex justify-between items-center">
        <h2 className="text-lg uppercase">Cart</h2>
        <Link href={"/cart"}>
          <p className="text-lg text-blue-500">View All</p>
        </Link>
      </aside>
      <ul className="mt-10">
        {cartData.map((item: any) => (
          <li
            className=" flex space-x-10 w-full pb-5 pt-5 border-b-2"
            key={item._id}
          >
            <Image
              src={item.banner[0]}
              alt={item.productName}
              width={80}
              height={80}
              className="w-[100px] h-[100px]"
            />
            <div className="space-y-2 w-[250px]">
              <p className="text-gray-400">Thể loại</p>
              <h3 className="pb-4 text-xl font-semibold">{item.productName}</h3>
              <div className="flex space-x-4 items-center w-[300px]">
                <aside className="flex space-x-2 items-center">
                  <span className="font-semibold">SKU:</span>
                  <span className="text-[12px] text-blue-400 underline pt-[2px]">
                    SKU-892
                  </span>
                </aside>
                <aside className="flex space-x-2 items-center">
                  <span className="font-semibold">Nhà cung cấp:</span>
                  <span className="text-[12px] pt-[2px] text-blue-400 underline">
                    Lucas Shop
                  </span>
                </aside>
              </div>
              <button className="flex space-x-2 bg-green-100 text-green-400 items-center p-2 pr-4 pl-4">
                <span>Free Ship</span>
                <FaShippingFast />
              </button>
            </div>
            <div className="w-[200px] flex flex-col  border-l-2">
              <div className="flex items-center w-[70%] mx-auto  border  rounded-md">
                <button
                  className="border-r-2 w-[50px] h-full"
                  onClick={() => dispatch(decrementQuantity(item))}
                >
                  -
                </button>
                <input
                  type="text"
                  disabled
                  value={item.qty}
                  className="w-[50px] p-2 text-center bg-transparent text-[12px]"
                />
                <button
                  className="border-l-2 w-[50px] h-full"
                  onClick={() => dispatch(incrementQuantity(item))}
                >
                  +
                </button>
              </div>
              <div className="w-[70%] mx-auto pt-14">
                <span className="line-through text-gray-400 text-xl">$300</span>
                <p className="font-semibold text-xl">${item.total}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCheck;
