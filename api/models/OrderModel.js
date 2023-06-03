import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "Nhập email bạn ui"],
    },
    discount: {
      type: String,
    },
    cart: {
      type: Array,
      require: [true, "khong có giá s làm"],
    },
    cartId: {
      type: String,
      require: [true, "phai co id"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Orther", OrderSchema);
