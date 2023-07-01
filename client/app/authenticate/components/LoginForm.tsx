"use client";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "../../../feature/User/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import { UserService } from "../../../feature/User/UserService";

type LoginUserProps = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { user, isSuccess, isError, message } = useSelector(
    (state: any) => state.user
  );
  const [loginUser, setLoginUser] = useState<LoginUserProps>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess && user) {
      route.push("/");
    }
  }, [dispatch, user, isSuccess]);

  const { email, password } = loginUser;
  const handleChange = (e: any) => {
    setLoginUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // toast error every error pass
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    }
    dispatch(login(userData));
    try {
      await UserService.logInUser(userData);
    } catch (error: any) {
      toast.error(error.message, {autoClose: 2000});
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-[70%] mx-auto">
      <ToastContainer />
      <aside>
        <h2 className="text-3xl font-semibold uppercase text-center">
          Chào mừng bạn
        </h2>
        <p className="text-center">Vui lòng nhập thông tin dưới đây</p>
      </aside>
      <form className="mt-5" onSubmit={handleSubmit}>
        <input
          type="email"
          className="p-2 border-b w-full outline-none"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="p-2 border-b w-full mt-5 outline-none"
          placeholder="Password"
          name="password"
          required
          onChange={handleChange}
        />
        <section className="mt-6 flex w-full justify-between items-center">
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="remember" />
            <label htmlFor="remember">Nhớ mật khẩu</label>
          </div>
          <button className="font-semibold underline">Quên mật khẩu</button>
        </section>
        <button
          type="submit"
          className="mt-8 w-full p-4 bg-black rounded-xl text-white font-semibold uppercase"
        >
          Đăng nhập
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
        <span className="text-[12px]">Đăng nhập với google</span>
      </button>

      <aside className="mt-10">
        <span className="mr-2">Bạn chưa có tài khoản?</span>
        <Link href="/authenticate/signup">
          <span className="font-semibold">Đăng ký ở đây</span>
        </Link>
      </aside>
    </div>
  );
};

export default LoginForm;
