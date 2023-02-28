"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import { toast } from "react-toastify";
import {
  decrementItemCart,
  deleteItemCart,
  getItemCart,
  incrementItemCart,
} from "../../../feature/Cart/CartSlice";

const CartDetail = () => {
  const { cart, message } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.user);
  const [cartData, setCartData] = useState(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemCart(user._id));
  }, [cart, message, dispatch]);

  return (
    <div className="w-[90%] mx-auto mt-20">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th className="text-sm font-semibold uppercase">Product</th>
            <th className="text-sm font-semibold uppercase">Price</th>
            <th className="text-sm font-semibold uppercase">Quantity</th>
            <th className="text-sm font-semibold uppercase">subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product: any, i: any) => (
            <tr key={product._id}>
              <td>{i + 1}</td>
              <td>
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.banner}
                    alt={product.productName}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px]"
                  />
                  <p className="text-sm uppercase font-semibold">
                    {product.productName}
                  </p>
                </div>
              </td>
              <td>${product.price}</td>
              <td>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => dispatch(incrementItemCart(product._id))}
                  >
                    +
                  </button>
                  <input
                    type="text"
                    value={product.qty}
                    className="w-[40px] text-center"
                    disabled
                  />
                  <button
                    onClick={() => dispatch(decrementItemCart(product._id))}
                  >
                    -
                  </button>
                </div>
              </td>
              <td>${product.total}</td>
              <td>
                <button onClick={() => dispatch(deleteItemCart(product._id))}>
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 flex items-center justify-between">
        <section className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Mã giảm giá..."
            className="p-2 border-b-2 outline-none"
          />
          <button className="p-2 bg-yellow-300 uppercase text-sm font-semibold">
            Áp Dụng
          </button>
        </section>
        <button className="p-2 bg-yellow-300 uppercase text-sm font-semibold">
          Cập nhật giỏ hàng
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold uppercase">Tổng cộng</h2>
        <div className="mt-5 space-y-5">
          <section className="flex items-center justify-between w-[20%] pb-2 border-b-2">
            <h3 className="text-sm font-semibold uppercase">Giá</h3>
            <p>$300</p>
          </section>
          <section className="flex items-center justify-between w-[20%] pb-2 border-b-2">
            <h3 className="text-sm font-semibold uppercase">Tổng cộng</h3>
            <p>$300</p>
          </section>
          {user ? (
            <Link href="/checkout">
              <button className="p-2 bg-yellow-300 uppercase text-sm font-semibold mt-5">
                Thanh toán
              </button>
            </Link>
          ) : (
            <button
              onClick={() => toast.warning("Vui lòng đăng nhập")}
              className="p-2 bg-yellow-300 uppercase text-sm font-semibold mt-5"
            >
              Thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
