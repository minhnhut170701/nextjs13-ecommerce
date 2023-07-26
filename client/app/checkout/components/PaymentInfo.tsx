"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cleanItemCart } from "../../../feature/Cart/CartSlice";
import getStripe from "../../../lib/getStripe";
import { setSuccess } from "../../../feature/Order/OrderSlice";

const PaymentInfo = () => {
  const searchParams: any = useSearchParams();
  const { cart } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0)
  const [discount, setDiscout] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (prev: any, current: any) => (prev = prev + current.total),
      0
    );

    if (cart) {
      setTotalPrice(total);
    }
    if (searchParams.get("discount")) {
      setDiscout(Math.round((total / 100) * 80));
    }
  }, [totalPrice, dispatch, cart]);

  const handleCheckout = async () => {
    try {
      
      const stripe = await getStripe();
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
          discount: decodeURIComponent(searchParams.get("discount")) || "",
        }),
      });
  
      if (!response.ok) return;
  
      const data = await response.json();
  
      toast.loading("Redirecting...");
  
      await stripe.redirectToCheckout({ sessionId: data.id });
  
      dispatch(setSuccess(true))
    } catch (error) {
      console.log('eeqwe nè: ', error)
    }
  };
  return (
    <div className="border w-[40%] bg-white rounded-lg p-6">
      <h2 className="text-lg uppercase font-semibold">Tổng cộng</h2>
      <div className="mt-6">
        <h3 className="text-md font-semibold">Sản phẩm</h3>
        <ul className="mt-3 pb-4 pt-4 border-b-2 pr-4 border-t-2 overflow-y-scroll h-[200px]">
          {cart.map((item: any) => (
            <li className="flex w-full justify-between mb-2" key={item._id}>
              <aside className="flex flex-col space-y-1">
                <span className="font-semibold">{item.productName}</span>
                <span className="text-gray-400">35L x 11W x 65H - 5KG -250$</span>
              </aside>
              <p className="font-semibold">${item.total}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pb-4 border-b-2">
        <aside className="space-y-2">
          <h3 className="font-semibold text-md">Vận chuyển từ:</h3>
          <p className="text-md text-gray-400"></p>
        </aside>
        <aside className="space-y-2 mt-5">
          <h3 className="font-semibold text-md">Đến:</h3>
          <p className="text-md text-gray-400"></p>
        </aside>
      </div>
      <div className="mt-6 space-y-2">
        <aside className="flex w-full justify-between items-center">
          <span className="text-gray-400">Giá gốc</span>
          <span>{totalPrice}$</span>
        </aside>
        <aside className="flex w-full justify-between items-center">
          <span className="text-gray-400">Giảm giá</span>
          <span>20%</span>
        </aside>
        <aside className="flex w-full justify-between items-center">
          <span className="text-gray-400">Tổng cộng</span>
          <span>${discount == 0 ? totalPrice : discount}</span>
        </aside>

        <aside className="flex w-full justify-between items-center">
          <span className="text-lg font-semibold">Tổng</span>
          <span className="text-lg font-semibold">${discount == 0 ? totalPrice : discount}</span>
        </aside>
      </div>
      <div className="w-[90%] mx-auto flex space-x-2 items-center justify-center">
        <button className="w-[120px] h-[50px] border bg-white rounded-md">
          Hủy
        </button>
        <button
          className="w-[120px] h-[50px] border bg-blue-500 rounded-md text-white"
          onClick={handleCheckout}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
