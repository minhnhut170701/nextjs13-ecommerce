import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: [true, "Nhập tên bạn ui"],
    },
    price: {
        type: String,
        require: [true, "khong có giá s làm"],
      },
    userName: {
      type: String,
      require: [true, "Nhập email bạn ui"],
    },
    qty: {
      type: String,
      require: [true, "số luong sp dau?"],
    },
    address: {
      type: String,
      require: [true, "khong có dia chỉ s làm"],
    },
    discount: {
      type: String,
    },
    total: {
      type: String,
      require: [true, "khong có giá s làm"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Orther", OrderSchema);
