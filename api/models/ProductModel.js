import mongoose from "mongoose";

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
  reviewer: {
    type: Array,
  },
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
});

export default mongoose.model("Product", productSchema);
