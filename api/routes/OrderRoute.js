import express from "express";
import Order from "../models/OrderModel.js"
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

// add comment
route.post("/add", async (req, res) => {
  const { userName, productName, price, qty, address, total, discount} = req.body;
  try {
    const order = new Order({ userName, productName, price, qty, address, total, discount });
    
    if(order){
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

export default route;
