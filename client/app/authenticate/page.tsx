import Link from "next/link";
import React from "react";
import LoginForm from "./components/LoginForm";

const AuthenticatePage = () => {
  return (
    <div>
      <Link href="/">
        <h1 className="text-3xl font-bold uppercase">Logo</h1>
      </Link>
      <LoginForm />
    </div>
  );
};

export default AuthenticatePage;
