import mongoose from "mongoose";
import Comment from "./CommentModel.js";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: [true, "Please add name for product"],
  },
  price: {
    type: Number,
    require: [true, "Please add price for product"],
  },
  banner: {
    type: Array,
    require: [true, "Please add banner image list for product"],
  },
  category: {
    type: String,
  },
  tag: {
    type: Array,
  },
  passForProduct: {
    type: String,
    require: [true, "sản phẩm phải có mã riêng"],
  },
  infor: {
    type: Array,
    require: [true, "sản phẩm phải có thông tin kích thước"],
  },
  description: {
    type: String,
  },
  reviewer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  slug: {
    type: String,
    require: [true, "sản phẩm phải có slug đường dẫn"],
  },
  categorySlug: {
    type: String,
  },
  qty: {
    type: Number,
  },
  total: {
    type: Number,
    require: [true, "sản phẩm phải có số lượng tồn kho"],
  }
});

export default mongoose.model("Product", productSchema);
