"use client";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart, getItemCart } from "../feature/Cart/CartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

interface ProductDetailType {
  productName: string;
  price: number;
  banner: Array<string>;
  category: string;
  tag: Array<string>;
  passForProduct: string;
  description: string;
  qty: number;
  productData: any;
}

type Product = {
  _id: string;
  productName: string;
  banner: Array<string>;
  price: number;
  qty: number;
  total: number;
};

function ThumbnailPlugin(mainRef: any) {
  return (slider: any) => {
    function removeActive() {
      slider.slides.forEach((slide: any) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: any) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide: any, idx: any) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const ProductDetail = ({
  productName,
  price,
  banner,
  category,
  tag,
  passForProduct,
  description,
  qty,
  productData,
}: ProductDetailType) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [countQty, setCountQty] = useState(1);
  const { user } = useSelector((state: any) => state.user);
  const { message } = useSelector((state: any) => state.cart);
  useEffect(() => {
    setCountQty(countQty <= 0 ? 1 : countQty);
  }, [countQty]);

  useEffect(() => {
    if(user){
      dispatch(getItemCart(user._id));
    }
  }, [user,message]);

  const handleAddToCart = (product: any, countQty: number) => {
    if (user?.email) {
      const cartItem = {
        productName: product.productName,
        banner: product.banner[0],
        price: product.price,
        qty: countQty,
      };
      dispatch(
        addToCart({
          cartData: cartItem,
          userId: user._id,
        })
      );
      toast.success("Đã thêm vào giỏ hàng");
    } else {
      toast.warning("Vui lòng đăng nhập");
    }
  };

  // set up slider
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        {/* img banner slice start */}
        <div className="lg:w-[35%]">
          <div ref={sliderRef} className="keen-slider">
            {banner.map((item: any, i: any) => (
              <div
                key={i + 1}
                className={`keen-slider__slide number-slide${
                  i + 1
                } p-4 lg:flex-none flex justify-center`}
              >
                <Image
                  src={item}
                  width={400}
                  height={300}
                  alt={productName}
                  className="w-[400px] h-[400px]"
                />
              </div>
            ))}
          </div>
          <div ref={thumbnailRef} className="keen-slider thumbnail mt-5">
            {banner.map((item: any, i: any) => (
              <div
                key={i + 1}
                className={`keen-slider__slide number-slide${
                  i + 1
                } cursor-pointer flex justify-center`}
              >
                <Image
                  src={item}
                  width={100}
                  height={100}
                  alt={productName}
                  className="w-[100px] h-[100px]  "
                />
              </div>
            ))}
          </div>
        </div>
        {/* img banner slice end */}
        <div className="space-y-5 lg:w-[65%] lg:mt-0 mt-10">
          <h2 className="uppercase text-3xl font-semibold">{productName}</h2>
          <div className="flex space-x-1 text-yellow-400">
            <span>
              <AiFillStar />
            </span>
            <span>
              <AiFillStar />
            </span>
            <span>
              <AiFillStar />
            </span>
            <span>
              <AiFillStar />
            </span>
            <span>
              <AiOutlineStar />
            </span>
          </div>
          <p>${price}</p>
          <p>{description}</p>
          <div className="flex space-x-10">
            <div className="flex items-center space-x-5">
              <button onClick={() => setCountQty(countQty + 1)}>+</button>
              <input
                type="number"
                className="p-2 pl-4 pr-4 border w-[80px] bg-gray-200 text-center"
                value={countQty}
                disabled
              />
              <button onClick={() => setCountQty(countQty - 1)}>-</button>
            </div>
            <button
              className="uppercase p-4 font-semibold bg-yellow-300"
              onClick={() => handleAddToCart(productData, countQty)}
            >
              Add to cart
            </button>
          </div>
          <article className="space-y-3">
            <aside className="flex space-x-4">
              <h5 className="text-lg font-semibold uppercase">SKU: </h5>
              <p>{passForProduct}</p>
            </aside>
            <aside className="flex space-x-4">
              <h5 className="text-lg font-semibold uppercase">CATEGORY: </h5>
              <p className="uppercase">{category}</p>
            </aside>
            <aside className="flex space-x-4">
              <h5 className="text-lg font-semibold uppercase">TAG: </h5>
              <p>{tag}</p>
            </aside>
          </article>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
