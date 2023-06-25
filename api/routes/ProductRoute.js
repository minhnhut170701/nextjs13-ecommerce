import express from "express";
import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from 'cloudinary';

const route = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all product
route.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500);
    throw new Error("không thể tạo sản phẩm");
  }
});

// remove product
route.delete("/remove/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (product) {
      res.status(200).send("Xóa sản phẩm thành công");
    } else {
      res.status(404).send("Không tìm thấy sản phẩm");
    }
  } catch (error) {
    res.status(500).send("Lỗi api");
  }
});

// find one a product
route.get("/detail/:productSlug/", async (req, res) => {
  const { productSlug } = req.params;
  if (!productSlug) {
    res.status(400).json({ message: "Missing parameter: productSlug" });
    return;
  }
  try {
    const findProduct = await Product.findOne({ slug: productSlug });
    if (findProduct) {
      res.status(200).json(findProduct);
    }
  } catch (error) {
    res.status(500);
    console.log("lỗi nè: ", error);
  }
});

//filter category
route.get("/category/:cateName", async (req, res) => {
  const { cateName } = req.params;
  let categories = [cateName];
  if (cateName === "ao-nam" || cateName === "ao-nu") {
    categories.push("unisex");
  }
  try {
    const cateProduct = await Product.find({
      categorySlug: { $in: categories },
    });
    if (cateProduct) {
      res.status(200).json(cateProduct);
    }
  } catch (error) {
    res.status(500);
    console.log("lỗi nè: ", error);
  }
});

// search product by name
route.post("/search", async (req, res) => {
  const { searchText, rangePrice } = req.body;

  const regexSearchText = new RegExp(searchText.toLowerCase(), "i");

  // Check if rangePrice is undefined
  let priceFilter = {};
  if (rangePrice && rangePrice !== "0") {
    priceFilter = {
      price: {
        $gte: 0,
        $lte: rangePrice,
      },
    };
  }

  try {
    const products = await Product.find({
      $and: [
        priceFilter,
        {
          productName: { $regex: regexSearchText },
        },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Create product
route.post("/create", async (req, res) => {
  const {
    productName,
    price,
    category,
    tag,
    passForProduct,
    infor,
    description,
  } = req.body;

  const photoUrl = await cloudinary.uploader.upload(photo);

  try {
    const newProduct = await Product.create({
      productName,
      price,
      banner: [photoUrl.url],
      category,
      tag,
      passForProduct,
      infor,
      description,
    });
    if (newProduct) {
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(500);
    throw new Error("không thể tạo sản phẩm");
  }
});





export default route;
