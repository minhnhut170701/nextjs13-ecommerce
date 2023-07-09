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
    <>
      {data.slice(0,5).map((item: any) => (
        <Link href={`product/${item.slug || "ao-thun-nam-thoi-trang"}`} key={item._id}>
          <Image
            src={item.banner[0]}
            alt={item.productName}
            width={300}
            height={300}
            className="w-[300px] h-[300px]"
          />
          <div className="flex items-center mt-3 justify-between">
            <h3 className="text-sm font-semibold uppercase">{item.productName}</h3>
            <p>${item.price}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default RelatedProduct;
