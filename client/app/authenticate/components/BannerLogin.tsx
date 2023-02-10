'use client'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"
import {BsStarFill} from 'react-icons/bs'

const BannerLogin =() =>{
  return (
    <div className='w-[50%] border bg-no-repeat bg-contain bg-center relative' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)`}}>
           {/* content */}
           <div className='relative z-20 flex flex-col items-center justify-center w-full h-full text-white p-14 pt-60'>
              <h2 className='text-3xl font-semibold uppercase'>We move 10x faster than our peers and stay consistent. While they're bogger down with design debt, we're releasing new features</h2>
              <div className='flex w-full items-center justify-between pt-14'>
                <aside>
                  <h3>Sophie Hall</h3>
                  <p>Founder, catalog</p>
                  <p>Web design, Acency</p>
                </aside>
                <div>
                    <aside className="flex space-x-2 items-center">
                        <span className="text-yellow-400"><BsStarFill /></span>
                        <span className="text-yellow-400"><BsStarFill /></span>
                        <span className="text-yellow-400"><BsStarFill /></span>
                        <span className="text-yellow-400"><BsStarFill /></span>
                        <span className="text-yellow-400"><BsStarFill /></span>
                    </aside>
                    <div className='flex space-x-5 items-center mt-5'>
                      <button className="p-2 rounded-full border text-center"><AiOutlineArrowLeft /></button>
                      <button className="p-2 rounded-full border text-center"><AiOutlineArrowRight /></button>
                    </div>
                </div>
              </div>
           </div>
           <div className='w-full h-full backdrop-blur-sm bg-black/30 backdrop-opacity-20 absolute top-0 left-0' />
        </div>
  )
}

export default BannerLogin