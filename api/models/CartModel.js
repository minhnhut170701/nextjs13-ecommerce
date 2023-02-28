import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    banner: {
      type: String,
    },
    price: {
      type: Number,
    },
    qty: {
      type: Number,
    },
    total: {
      type: Number,
    },
    discount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
