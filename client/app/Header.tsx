"use client";
import React, { useEffect, useState, useRef } from "react";
import { VscSearch } from "react-icons/vsc";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/User/UserSlice";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";

const Header = () => {
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
    if (user?.name) {
      setUserName(user?.name);
    }
  }, [user]);

  useEffect(() => {
    if (cart.length >= 0) {
      setNotifiItem(cart.length);
    }
  }, [cart]);

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
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <ul className="flex space-x-7 items-center">
          <li className="flex space-x-2 items-center">
            <VscSearch />
            <span>Search</span>
          </li>
          <li>
            {userName ? (
              <button
                className="flex space-x-2 items-center"
                onClick={handleLogout}
              >
                <Image
                  src={userImg}
                  alt={userName}
                  width={30}
                  height={30}
                  className="w-[30x] h-[30px] rounded-full"
                />
                <span>{userName}</span>
              </button>
            ) : (
              <Link
                href="/authenticate"
                className="flex space-x-2 items-center"
              >
                <FiUser />
                <span>Account</span>
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
