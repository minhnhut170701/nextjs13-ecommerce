import express from "express";
import Product from "../models/ProductModel.js";
import Comment from "../models/CommentModel.js";
import mongoose from "mongoose";
const route = express.Router();

//get all comment
route.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    if (comments) {
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(500);
    console.log("Lỗi server: ", error);
  }
});

//get comment by id
route.get("/:productId", async (req, res) => {
  try {
    const comment = await Product.findById(req.params.productId).populate(
      "reviewer"
    );
    if (comment) {
      res.status(200).json(comment.reviewer);
    }
  } catch (error) {
    res.status(500);
    console.log("Lỗi server: ", error);
  }
});
// add comment
route.post("/add/:productId", async (req, res) => {
  const { userName, userImg, rate, commentText } = req.body;
  try {
    const comment = new Comment({ userName, userImg, rate, commentText });
    const product = await Product.findByIdAndUpdate(req.params.productId, {
      $push: {
        reviewer: comment,
      },
    });
    if (product) {
      await comment.save();
      res.status(200).json({
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
  } catch (error) {
    res.status(500);
    console.log("Lỗi server: ", error);
  }
});

export default route;
