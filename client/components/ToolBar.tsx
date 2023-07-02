"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import {
  GiLargeDress,
  GiTrousers,
  GiWatch,
  GiLightBackpack,
  GiHandBag,
  GiBelt,
} from "react-icons/gi";
import {
  MdLocalShipping,
  MdOutlineCompareArrows,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { base64Decode, base64Encode } from "../utils/encodeParams";

const ToolBar = () => {
  const searchParams = useSearchParams();
  const search = base64Decode(searchParams.get("searchText") || '')
  const range = searchParams.get("range");

  const [searchText, setSearchText] = useState(search || '');
  const [rangeValue, setRangeValue] = useState(range || '300');
  const router = useRouter();
 
  // useEffect(() =>{
  //   if(searchParams.get("searchText")){
  //     setSearchText(search)
  //   }

  //   if(searchParams.get("range")){
  //     setRangeValue(range)
  //   }else{
  //     setRangeValue('300')
  //   }
  // }, [searchParams])
  const handleChangSearch = (e:  React.ChangeEvent<HTMLInputElement>) =>{
      setSearchText(e.target.value)
    console.log('change nè: ', e.target.value)

  }

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    const encoded = base64Encode(searchText);
    router.push(`/productlist?searchText=${encoded}&range=${rangeValue}`);
  };


  return (
    <div className="w-full">
      <form className="p-2 border w-[250px] mt-5" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          name="searchText"
          value={searchText}
          className="p-1 outline-none border-b-2"
          onChange={(e) =>  handleChangSearch(e)}
        />
        <button
          className="p-3"
          type="button"
          onClick={(e) => handleSubmitSearch(e)}
        >
          <AiOutlineSearch />
        </button>
      <h2 className="p-4 text-xl font-bold uppercase">Product</h2>
      <ul className="space-y-4">
        <li>
          <Link
            href={`/productlist/ao-nam`}
            className="flex space-x-3 items-center"
          >
            <span>
              <FaTshirt />
            </span>
            <span>Áo nam</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/ao-nu`}
            className="flex space-x-3 items-center"
          >
            <span>
              <GiLargeDress />
            </span>
            <span>Áo Nữ</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/vay`}
            className="flex space-x-3 items-center"
          >
            <span>
              <GiTrousers />
            </span>
            <span>Váy</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/dong-ho`}
            className="flex space-x-3 items-center"
          >
            <span>
              <GiWatch />
            </span>
            <span>Đồng Hồ</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/balo`}
            className="flex space-x-3 items-center"
          >
            <span>
              <GiLightBackpack />
            </span>
            <span>Balo</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/tui-xach`}
            className="flex space-x-3 items-center"
          >
            <span>
              <GiHandBag />
            </span>
            <span>Túi Xách</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/giay`}
            className="flex space-x-3 items-center"
          >
            <span>
              <FaTshirt />
            </span>
            <span>Giày</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/productlist/phu-kien`}
            className="flex space-x-3 items-center"
          >
            <span>
              <GiBelt />
            </span>
            <span>Phụ kiện</span>
          </Link>
        </li>
      </ul>

      <h2 className="p-4 text-xl font-bold uppercase mt-5">Dịch Vụ</h2>
      <ul className="space-y-4">
        <li className="flex space-x-3 items-center">
          <span>
            <MdLocalShipping />
          </span>
          <span>Vận Chuyển</span>
        </li>
        <li className="flex space-x-3 items-center">
          <span>
            <MdOutlineCompareArrows />
          </span>
          <span>So sách giá</span>
        </li>
        <li className="flex space-x-3 items-center">
          <span>
            <MdOutlineSupportAgent />
          </span>
          <span>Hỗ trợ</span>
        </li>
      </ul>

      <h2 className="p-4 text-xl font-bold uppercase mt-5">Lọc theo giá</h2>
      
        <input
          type="range"
          id="rangeValue"
          name="rangeValue"
          min="0"
          max="400"
          defaultValue={0}
          value={rangeValue ? rangeValue : range }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRangeValue(e.target.value)
          }
        />
        <div className="flex items-center justify-between mt-5">
          <p>0$-{rangeValue ? rangeValue : range}$</p>
          <button
            type="submit"
            className="p-2 pl-6 pr-6 bg-yellow-300"
          >
            Lọc
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToolBar;
