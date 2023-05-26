"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { register } from "../../../feature/User/UserSlice";
import { toast } from "react-hot-toast";

type UserProps = {
  userName: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { user, isSuccess, isError } = useSelector((state: any) => state.user);
  const [userForm, setUserForm] = useState<UserProps>({
    userName: "",
    email: "",
    password: "",
  });

  const { userName, email, password } = userForm;

  useEffect(() => {
    if (isError) {
      toast.error("Đăng ký thất bại! Vui lòng thử lại");
    }
    if (user && isSuccess) {
      route.push("/");
    }
  }, [dispatch, user, isSuccess, isError]);

  const onChange = (e: any) => {
    setUserForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      userName,
      email,
      password,
    };
    dispatch(register({ userData: userData }));
  };
  return (
    <div>
      <Link href="/">
        <h1 className="text-3xl font-bold uppercase">Logo</h1>
      </Link>
      <div className="flex flex-col items-center justify-center h-full w-[70%] mx-auto">
        <aside>
          <h2 className="text-3xl font-semibold uppercase text-center">
            Tạo tài khoản
          </h2>
          <p className="text-center">Bắt đầu hành trình mua sắm của bạn</p>
        </aside>
        <form className="mt-5">
          <input
            type="text"
            className="p-2 border-b w-full outline-none"
            placeholder="Name"
            name="userName"
            onChange={onChange}
          />
          <input
            type="email"
            className="p-2 border-b w-full outline-none mt-5"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
          <input
            type="password"
            className="p-2 border-b w-full mt-5 outline-none"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
          <button
            type="submit"
            className="mt-8 w-full p-4 bg-black rounded-xl text-white font-semibold uppercase"
            onClick={handleSubmit}
          >
            Tạo tài khoản
          </button>
        </form>
        {/* line or */}
        <div className="flex w-full items-center justify-center mt-5">
          <div className="w-[20%] h-[2px] bg-gray-200" />
          <span className="mr-2 ml-2 text-[12px]">Hoặc</span>
          <div className="w-[20%] h-[2px] bg-gray-200" />
        </div>

        <button className=" flex text-xl font-semibold space-x-2 p-2 border-2 w-[60%] items-center justify-center mt-6">
          <span>
            <FcGoogle />
          </span>
          <span className="text-[12px]">Đăng nhập với Google</span>
        </button>

        <aside className="mt-10">
          <span className="mr-2">Đã có tài khoản?</span>
          <Link href="/authenticate">
            <span className="font-semibold">Đăng nhập</span>
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default SignUpPage;
