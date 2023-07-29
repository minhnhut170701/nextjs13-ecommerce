import express from "express";
import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from 'cloudinary';

const route = express.Router();

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
    photo,
    quanity
  } = req.body;

  try {
    const photoUrl = await cloudinary.uploader.upload(photo);
    if(photoUrl){
      const newProduct = await Product.create({
        productName,
        price,
        banner: [photoUrl.url],
        category,
        tag,
        passForProduct,
        infor,
        description,
        quanity
      });
      if (newProduct) {
        res.status(200).json(newProduct);
      }
    }
    
  } catch (error) {
    res.status(500);
    throw new Error("không thể tạo sản phẩm");
  }
});

// search product management

route.post("/search/management", async (req, res) => {
  const { searchText } = req.body;
  const regexSearchText = new RegExp(searchText.toLowerCase(), "i");
  try {
    const products = await Product.find({productName: regexSearchText});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


// add total for product sold out
route.post("/refill/product/:productId", async (req, res) => {
  const { quanity } = req.body;
  try {
    const product = await Product.findById(req.params.productId);

    if(product){
      if(product.quanity == 0){
        product.quanity = quanity;
        await product.save();
      }
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});




export default route;
