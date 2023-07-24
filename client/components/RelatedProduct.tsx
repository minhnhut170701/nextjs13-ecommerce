import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  img: StaticImageData;
  name: string;
  price: number;
}

function RelatedProduct({data}: any) {
  return (
    <div className="flex gap-3 flex-wrap ">
      {data.slice(0,5).map((item: any) => (
        <div key={item._id} className="w-[250px] h-[250px] md:mb-10 sm:mb-16"> 
          <Link href={`product/${item.slug || "ao-thun-nam-thoi-trang"}`}>
            <Image
              src={item.banner[0]}
              alt={item.productName}
              width={250}
              height={250}
              className="w-full h-full"
            />
            <div className="flex items-center justify-between w-full">
              <h3 className="text-sm font-semibold uppercase w-[60%] line-clamp-2">{item.productName}</h3>
              <p>${item.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RelatedProduct;
