import React from "react";
import Banner from "../components/Banner";
import { AiOutlineArrowRight } from "react-icons/ai";
import "../styles/custom.css";
import ListProductHome from "../components/ListProductHome";
import ToolBar from "../components/ToolBar";
import Product from "../components/Product";
import { ProductProps } from "../typing";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    "https://nextjs13-ecommerce.onrender.com/api/product",
    {
      next: { revalidate: 30 },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const product: ProductProps = await res.json();
  return product;
}

const HomePage = async () => {
  const data = await getData();

  return (
    <>
      <Header />
      <main>
        <Banner />
        {/* INFO: category */}
        <div className="flex xl:space-x-6 xl:space-y-0 space-y-6 xl:w-[90%] mx-auto xl:justify-center mt-10 xl:flex-row flex-col">
          <div className="overflow-hidden relative">
            <div className="xl:w-[450px] h-[350px] w-full bg-cate-1 bg-center bg-no-repeat overflow-hidden hover:scale-110 transition-all duration-300" />
            <aside className="absolute top-0 left-0 p-10 text-white">
              <h3 className="text-xl font-semibold">Bộ sưu tập mùa hè</h3>
              <p>Mua 1 tặng 1</p>
            </aside>
            <aside className="absolute bottom-0 left-0 p-10 z-20 w-[50%] bg-white">
              <h3 className="text-xl">Áo nam</h3>
              <Link
                href={`/productlist/ao-nam`}
                className="flex items-center space-x-2"
              >
                <span>Chi tiết</span>
                <span>
                  <AiOutlineArrowRight />
                </span>
              </Link>
            </aside>
          </div>
          <div className="overflow-hidden relative">
            <div className="xl:w-[450px] h-[350px] w-full bg-cate-2 bg-center bg-no-repeat bg-cover overflow-hidden hover:scale-110 transition-all duration-300" />
            <aside className="absolute top-0 left-0 p-10 text-white ">
              <h3 className="text-xl font-semibold">Bộ sưu tập mùa hè</h3>
              <p>Mua 1 tặng 1</p>
            </aside>
            <aside className="absolute bottom-0 left-0 p-10 z-20 w-[50%] bg-white">
              <h3 className="text-xl">Phụ kiện</h3>
              <Link
                href={`/productlist/phu-kien`}
                className="flex items-center space-x-2"
              >
                <span>Chi tiết</span>
                <span>
                  <AiOutlineArrowRight />
                </span>
              </Link>
            </aside>
          </div>
          <div className="overflow-hidden relative">
            <div className="xl:w-[450px] h-[350px] w-full bg-cate-3 bg-cover bg-center bg-no-repeat overflow-hidden hover:scale-110 transition-all duration-300   " />
            <aside className="absolute bottom-0 left-[50%] p-10 z-20  w-[90%] bg-white">
              <h3 className="text-xl">Váy</h3>
              <Link
                href={`/productlist/vay`}
                className="flex items-center space-x-2"
              >
                <span>Chi tiết</span>
                <span>
                  <AiOutlineArrowRight />
                </span>
              </Link>
            </aside>
          </div>
        </div>
        {/* list product */}
        <div className="flex justify-between w-[80%] mx-auto mt-20">
          <div className="xl:w-[20%]">
            <ToolBar />
          </div>

          <div className="w-[70%]">
            <Product data={data} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
