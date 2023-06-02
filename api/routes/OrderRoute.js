import express from "express";
import Order from "../models/OrderModel.js";
const route = express.Router();

//get all comment
route.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    if (order) {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500);
    console.log("Lỗi server: ", error);
  }
});

// add order
route.post("/add", async (req, res) => {
  const { userName, discount, cart } = req.body;
  console.log("body nè: ", req.body);
  try {
    const order = new Order({ userName, discount, cart });

    if (order) {
      await order.save();
      res.status(200).json({
        success: true,
        data: order,
      });
    }
  } catch (error) {
    res.status(500);
    console.log("Lỗi server: ", error);
  }
});

// delete order
route.delete("/remove/:orderId", async (req, res) => {
  try {
    const orderDelete = await Order.findById(req.params.orderId);
    if (orderDelete) {
      const rem = await Order.deleteOne({ _id: req.params.orderId });
      if (rem) {
        res.status(200).send("Xóa sản phẩm thành công");
      } else {
        res.status(400).send("không thể xóa sản phẩm");
      }
    } else {
      res.status(404).send("không tìm thấy sản phẩm");
    }
  } catch (error) {
    res.status(500).send("Lỗi api");
  }
});

export default route;
