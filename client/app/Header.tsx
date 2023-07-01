"use client";
import React, { useEffect, useState, useRef } from "react";
import { VscSearch } from "react-icons/vsc";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/User/UserSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { cleanItemCart, getItemCart } from "../feature/Cart/CartSlice";


const Header = () => {
  const searchParams: any = useSearchParams();
  const [headerFixed, setHeaderFixed] = useState("relative");
  const { user, userImg } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const [notifiItem, setNotifiItem] = useState(0);
  const [userName, setUserName] = useState(null);
  const route = useRouter();
  const dispatch = useDispatch();
  const ref: any = useRef(false);
  const handleWindowResize = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 50 ? setHeaderFixed("fixed") : setHeaderFixed("relative");
    }
  };

  const addToOrder = async () => {
    try {
      if (cart.length > 0) {
        const orderAdd = await fetch(
          "https://nextjs13-ecommerce.onrender.com/api/order/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: user.name,
              discount: decodeURIComponent(searchParams.get("discount")) || "",
              cart: cart,
              cartId: cart._id,
            }),
          }
        );
     
        if (orderAdd.ok) {
          dispatch(cleanItemCart(user._id));
          window.history.replaceState(null, '', '/')
          return;
        }
      }
    } catch (error) {
      console.log("lỗi api");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowResize);
    return () => {
      window.removeEventListener("scroll", handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    route.push("/authenticate");
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(getItemCart(user._id));
      if (cart.length >= 0 ) {
        setNotifiItem(cart.length);
        if (searchParams.get("success") == "true") {
          addToOrder();
        }
      }
    }
  }, [user,cart.length, searchParams.get("success")]);

 

  return (
    <header
      className={`flex justify-between p-6 bg-white shadow-xl z-50 w-full ${headerFixed}`}
    >
      <ToastContainer />
      <h1 className="text-3xl font-bold uppercase text-center w-[20%]">
        {" "}
        <Link href="/">Logo</Link>
      </h1>
      <nav className="w-[80%] flex justify-between items-center relative">
        <ul className="flex space-x-10 items-center">
          <li>Trang chủ</li>
          <li>Cửa hàng</li>
          <li>Về chúng tôi</li>
          <li>Liên hệ</li>
        </ul>
        <ul className="flex space-x-7 items-center">
          <li className="flex space-x-2 items-center">
            <VscSearch />
            <span>Tìm kiếm</span>
          </li>
          <li>
            {user ? (
              <button
                className="flex space-x-2 items-center"
                onClick={handleLogout}
              >
                <Image
                  src={userImg}
                  alt={user.name}
                  width={30}
                  height={30}
                  className="w-[30x] h-[30px] rounded-full"
                />
                <span>{user.name}</span>
              </button>
            ) : (
              <Link
                href="/authenticate"
                className="flex space-x-2 items-center"
              >
                <FiUser />
                <span>Tài khoản</span>
              </Link>
            )}
          </li>
          <li className="relative">
            <Link href="/cart" className="flex space-x-2 items-center">
              <span>
                <FiShoppingCart />
              </span>
              {notifiItem > 0 && (
                <div className="w-[20px] h-[20px] rounded-full bg-red-500 animate-pulse text-[12px] text-white text-center">
                  <span>{notifiItem}</span>
                </div>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
