import React from 'react'

const PaymentInfo = () => {
  return (
    <div className='border w-[40%] bg-white rounded-lg p-6'>
        <h2 className='text-lg uppercase font-semibold'>Tổng cộng</h2>
        <div>
            <h3>Sản phẩm</h3>
            <ul>
                <li>
                    <aside>
                        <span>Tên sản phẩm</span>
                        <span>Size</span>
                    </aside>
                    <p>$45</p>
                </li>
            </ul>
        </div>

        <div>
            <aside>
              <h3>Vận chuyển từ:</h3>
              <p>tp htcm quan 7 khu che xuất</p>
            </aside>
            <aside>
              <h3>Đến:</h3>
              <p>Tp bien hòa hưng đạo vương</p>
            </aside>
        </div>
        <div>
            <aside>
                <span>Giá gốc</span>
                <span>80$</span>
            </aside>
            <aside>
              <span>Giảm giá</span>
              <span>20%</span>
            </aside>
            <aside>
              <span>Tổng cộng</span>
              <span>$40</span>
            </aside>

            <aside>
                <span>Tổng</span>
                <span>$40</span>
            </aside>
        </div>
        <div>
            <button>Hủy</button>
            <button>Thanh toán</button>
        </div>
    </div>
  )
}

export default PaymentInfo