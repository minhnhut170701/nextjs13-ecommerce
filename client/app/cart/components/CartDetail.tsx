"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
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
  const [discount, setDiscout] = useState("");
  const discountRef: any = useRef();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getItemCart(user._id));
  }, [message, dispatch]);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce(
        (prev: any, current: any) => (prev = prev + current.total),
        0
      );
      setTotalPrice(total);
    }
    console.log("jhehehe: ", totalPrice);
  }, [totalPrice, dispatch]);

  const handleApplyDiscount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDiscout(discountRef.current.value);
  };

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
        <form
          className="flex items-center space-x-4"
          onSubmit={handleApplyDiscount}
        >
          <input
            type="text"
            name="discount"
            ref={discountRef}
            placeholder="M?? gi???m gi??..."
            className="p-2 border-b-2 outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-yellow-300 uppercase text-sm font-semibold"
          >
            ??p D???ng
          </button>
          {discount && (
            <p className="font-semibold p-4 border">
              M?? gi???m ??p d???ng:{" "}
              <span className="p-2 bg-gray-200">{discount}</span>
            </p>
          )}
        </form>
        <button className="p-2 bg-yellow-300 uppercase text-sm font-semibold">
          C???p nh???t gi??? h??ng
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold uppercase">T???ng c???ng</h2>
        <div className="mt-5 space-y-5">
          <section className="flex items-center justify-between w-[20%] pb-2 border-b-2">
            <h3 className="text-sm font-semibold uppercase">Gi??</h3>
            <p>${totalPrice}</p>
          </section>
          <section className="flex items-center justify-between w-[20%] pb-2 border-b-2">
            <h3 className="text-sm font-semibold uppercase">T???ng c???ng</h3>
            <p>${totalPrice}</p>
          </section>
          {user ? (
            <Link href={`/checkout?discount=${encodeURIComponent(discount)}`}>
              <button className="p-2 bg-yellow-300 uppercase text-sm font-semibold mt-5">
                Thanh to??n
              </button>
            </Link>
          ) : (
            <button
              onClick={() => toast.warning("Vui l??ng ????ng nh???p")}
              className="p-2 bg-yellow-300 uppercase text-sm font-semibold mt-5"
            >
              Thanh to??n
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
