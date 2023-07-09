"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComment } from "../feature/Comment/CommentSlice";
import { toast } from "react-toastify";
import moment from "moment";

type ProductInfoProps = {
  description: string;
  infor: Array<object>;
  reviewer: Array<object>;
  Id: string;
};

const ProductInfor = ({
  description,
  infor,
  Id,
  reviewer,
}: ProductInfoProps) => {
  const [checkedCount, setCheckedCount] = useState<any>(null);
  const [commentData, setCommentData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { data } = useSelector((state: any) => state.comment);
  const [commentForm, setCommentForm] = useState({
    userName: user?.name,
    userImg:
      "https://images.unsplash.com/photo-1676238641102-24a49ef42493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    commentText: "",
  });

  const { userName, userImg, commentText } = commentForm;
  const handleChange = (e: any) => {
    setCommentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = (index: number) => {
    setCheckedCount(index);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!checkedCount) {
      toast.warning("Vui lòng đánh giá sản phẩm trước khi bình luận.", {autoClose: 1500});
      return;
    }
    if(!user && !user?.username){
      toast.warning("Vui lòng đăng nhập trước khi đánh giá", {autoClose: 1500})
      return;
    }
    const data = {
      userName,
      userImg,
      rate: checkedCount,
      commentText,
    };

    dispatch(addComment({ commentData: data, productId: Id }));
    setCommentForm({
      userName: user?.name,
      userImg:
        "https://images.unsplash.com/photo-1676238641102-24a49ef42493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      commentText: "",
    });
    setCheckedCount(5);
  };

  useEffect(() => {
    dispatch(getComment({ productId: Id }));
    setCommentData(data ? data : []);
  }, [dispatch, data]);

  return (
    <div className="mt-16" key={Id}>
      <Tab.Group>
        <div className="border-b-2">
          <Tab.List className="w-[40%] flex">
            <Tab className="w-[30%] h-[50px] outline-none">
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "bg-yellow-300 hover:bg-yellow-300 w-full h-full border-none text-sm font-semibold uppercase"
                      : "bg-transparent hover:bg-yellow-300 w-full h-full text-sm font-semibold uppercase"
                  }
                >
                  Mô tả
                </button>
              )}
            </Tab>
            <Tab className="w-[40%] h-[50px] outline-none">
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "bg-yellow-300 hover:bg-yellow-300 w-full h-full border-none text-sm font-semibold uppercase"
                      : "bg-transparent hover:bg-yellow-300 w-full h-full text-sm font-semibold uppercase"
                  }
                >
                  Thông tin sản phẩm
                </button>
              )}
            </Tab>
            <Tab className="w-[30%] h-[50px] outline-none">
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "bg-yellow-300 hover:bg-yellow-300 w-full h-full border-none text-sm font-semibold uppercase"
                      : "bg-transparent hover:bg-yellow-300 w-full h-full text-sm font-semibold uppercase"
                  }
                >
                  Đánh giá
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            <p className="mt-5">{description}</p>
          </Tab.Panel>
          <Tab.Panel>
            <div className="w-[25%] mt-5">
              {infor.map((item: any, index: number) => (
                <div key={index}>
                  <article className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold uppercase">
                      Weight:{" "}
                    </h4>
                    <p>{item.w}</p>
                  </article>
                  <article className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold uppercase">
                      HEIGHT:{" "}
                    </h4>
                    <p> {item.h}</p>
                  </article>
                  <article className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold uppercase">SIZE: </h4>
                    <p> {item.size}</p>
                  </article>
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <h4 className="text-lg font-semibold uppercase mt-5">
              {commentData?.length} REVIEW FOR BILLBOARD
            </h4>
            {commentData?.length > 0 &&
              commentData?.map((item: any) => (
                <div className="mt-10 flex space-x-4" key={item._id}>
                  <Image
                    src={item.userImg}
                    width={50}
                    height={50}
                    alt={item.userName}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="space-y-2">
                    <div className="flex space-x-1 text-yellow-400">
                      {Array(item.rate)
                        .fill(item.rate)
                        .map((_, index) => (
                          <span key={index}>
                            <AiFillStar />
                          </span>
                        ))}
                      {Array(5 - item.rate)
                        .fill(item.rate)
                        .map((_, index) => (
                          <span key={index}>
                            <AiOutlineStar />
                          </span>
                        ))}
                    </div>
                    <div className="flex space-x-2 items-center">
                      <h5 className="text-md font-semibold">{item.userName}</h5>
                      <p>-</p>
                      <p className="text-sm">
                        {moment(item.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>
                    <p>{item.commentText}</p>
                  </div>
                </div>
              ))}

            <form className="space-y-3 mt-10" onSubmit={handleSubmit}>
              <h4 className="text-lg font-semibold uppercase mt-5">
                Đánh giá
              </h4>
              <p>
                Địa chỉ email của bạn sẽ không được công bố *
              </p>
              <p>Đánh giá của bạn</p>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  onClick={() => handleClick(1)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  onClick={() => handleClick(2)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  onClick={() => handleClick(3)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  onClick={() => handleClick(4)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  onClick={() => handleClick(5)}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <textarea
                  placeholder="Đánh giá của bạn"
                  required
                  className="h-[200px] w-full p-4 border-2 rounded-lg"
                  name="commentText"
                  onChange={handleChange}
                  value={commentText}
                />
                <button type="submit" className="p-4 bg-yellow-300 w-[20%]">
                  Bình Luận
                </button>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductInfor;
