'use client';
import React, {useState} from 'react'
import { Tab } from '@headlessui/react'
import userImage from "../../../images/user.png"
import Image from 'next/image';
import {AiFillStar, AiOutlineStar} from "react-icons/ai"


type ProductInfoProps = {
  description: string,
  infor: Array<object>
  reviewer: Array<object>


}

const ProductInfor = ({description, infor}: ProductInfoProps) => {
  const [checkedCount, setCheckedCount] = useState(0);

  const handleClick = (index: number) => {
    setCheckedCount(index);
  }
  
  return (
    <div className='mt-16'>
      <Tab.Group>
        <div className='border-b-2'>
          <Tab.List className='w-[40%] flex'>
            <Tab className='w-[30%] h-[50px] outline-none'>
                {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected ? 'bg-yellow-300 hover:bg-yellow-300 w-full h-full border-none text-sm font-semibold uppercase' 
                    : 'bg-transparent hover:bg-yellow-300 w-full h-full text-sm font-semibold uppercase'
                  }
                >
                 Description
                </button>
              )}
            </Tab>
            <Tab className='w-[40%] h-[50px] outline-none'>
                {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected ? 'bg-yellow-300 hover:bg-yellow-300 w-full h-full border-none text-sm font-semibold uppercase' 
                    : 'bg-transparent hover:bg-yellow-300 w-full h-full text-sm font-semibold uppercase'
                  }
                >
                 Additional information
                </button>
              )}
            </Tab>
            <Tab className='w-[30%] h-[50px] outline-none'>
                {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected ? 'bg-yellow-300 hover:bg-yellow-300 w-full h-full border-none text-sm font-semibold uppercase' 
                    : 'bg-transparent hover:bg-yellow-300 w-full h-full text-sm font-semibold uppercase'
                  }
                >
                  Review
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>
       
        <Tab.Panels>
          <Tab.Panel>
            <p className='mt-5'>
                {description}
            </p>
          </Tab.Panel>
          <Tab.Panel>
            <div className='w-[25%] mt-5'>
              {infor.map((item: any) => (
                <>
                <article className='flex items-center justify-between'>
                  <h4 className='text-lg font-semibold uppercase'>Weight: </h4>
                  <p>{item.w}</p>
                </article>
                <article className='flex items-center justify-between'>
                  <h4 className='text-lg font-semibold uppercase'>HEIGHT: </h4>
                  <p>	{item.h}</p>
                </article>
                <article className='flex items-center justify-between'>
                  <h4 className='text-lg font-semibold uppercase'>SIZE: </h4>
                  <p>	{item.size}</p>
                </article>
                </>
              
              ))}
              
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <h4 className='text-lg font-semibold uppercase mt-5'>1 REVIEW FOR BILLBOARD</h4>
            <div className='mt-3 flex space-x-4'>
              <Image src={userImage} width={80} height={80} alt='user-1' className='w-[80px] h-[80px] rounded-full' />
              <div className='space-y-2'>
                <div className='flex space-x-1 text-yellow-400'>
                  <span><AiFillStar /></span>
                  <span><AiFillStar /></span>
                  <span><AiFillStar /></span>
                  <span><AiFillStar /></span>
                  <span><AiOutlineStar /></span>
                </div>
                <div className='flex space-x-2'>
                  <h5 className='text-sm font-semibold'>JOANNE</h5>
                  <p>-</p>
                  <p>May 25, 2020</p>
                </div>
                <p>
                Sed et quem malorum, et qui duis causae facilis. Falli putent vel ut, hinc persius adolescens sea ad. Esse eripuit antiopam ex vim, ex vim doming vituperatoribus, ius petentium comprehensam no. Mea an minimum nostrum, eum id homero aliquam, graeco admodum liberavisse ut quo. Vero dissentias usu ne, sit ne impetus fastidii legendos. Sed eu brute harum imperdiet.
                </p>
              </div>
            </div>
            <div className='space-y-3 mt-10'>
              <h4 className='text-lg font-semibold uppercase mt-5'>POST A COMMENT</h4>
              <p>Your email address will not be published. Required fields are marked *</p>
              <p>Your Rating</p>
              <div className="rating">
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onClick={() => handleClick(1)} checked/>
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onClick={() => handleClick(2)}/>
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onClick={() => handleClick(3)}/>
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onClick={() => handleClick(4)}/>
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onClick={() => handleClick(5)}/>
              </div>
              <form className='flex flex-col space-y-3'>
                <textarea placeholder='Đánh giá của bạn' required  className='h-[200px] w-full p-4 border border-black'/>
                <button className='p-4 bg-yellow-300 w-[20%]'>Bình Luận</button>
              </form>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default ProductInfor