"use client";
import React, { useEffect, useState, useRef } from "react";
import { VscSearch } from "react-icons/vsc";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import {AiOutlineMenu} from "react-icons/ai"
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);
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
    setClientRendered(true);
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


  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // Step 2
  };
 

  return (
    <header
      className={`flex justify-between p-6 bg-white shadow-xl z-50 max-w-full w-full ${headerFixed}`}
    >
      <ToastContainer />
      <h1 className="text-3xl font-bold uppercase text-center w-[20%]">
        {" "}
        <Link href="/">Logo</Link>
      </h1>
      <nav className="xl:w-[80%] xl:flex justify-between items-center relative hidden">
        <ul className="flex space-x-10 items-center">
          <li>Trang chủ</li>
          <li>Cửa hàng</li>
          <li>Về chúng tôi</li>
          <li>Liên hệ</li>
        </ul>
        <ul className="flex space-x-7 items-center">
          <li>
            <a href="#searchId" className="flex space-x-2 items-center">
              <VscSearch />
              <span>Tìm kiếm</span>
            </a>
          </li>
          <li>
            {user && clientRendered ? (
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
      <div className=" xl:hidden w-[80%] flex justify-end" onClick={toggleModal}>
        <ul className="flex items-center space-x-4 mr-5">
          <li className="flex justify-center">
              {user && clientRendered ? (
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
              <Link href="/cart" className="flex space-x-2 items-center justify-center">
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
        <button className="text-xl">
          <span><AiOutlineMenu /></span>
        </button>
      </div>
      {/* Step 3: Modal menu */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={toggleModal}
        >
          <div className="bg-white p-4 rounded-lg text-center w-[50%]">
            <ul className="space-y-4">
              <li>
                <Link href="/">Trang chủ</Link>
              </li>
              <li>
                <Link href="/store">Cửa hàng</Link>
              </li>
              <li>
                <Link href="/about">Về chúng tôi</Link>
              </li>
              <li>
                <Link href="/contact">Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
