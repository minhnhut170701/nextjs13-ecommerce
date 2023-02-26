import express from "express";
import Product from "../models/ProductModel.js";

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

// // Get all product
// route.get("/getSlug", async (req, res) => {
//   try {
//     const products = await Product.find({slug: productSlug});
//     if (products) {
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error("không thể tạo sản phẩm");
//   }
// });

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
    banner,
    category,
    tag,
    passForProduct,
    infor,
    description,
  } = req.body;
  try {
    const newProduct = await Product.create({
      productName,
      price,
      banner,
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
