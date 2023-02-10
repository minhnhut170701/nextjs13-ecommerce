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

// find one a product
route.get("/:productSlug", async (req, res) => {
  const { productSlug } = req.params;
  try {
    const findProduct = await Product.findOne({ slug: productSlug });
    if (findProduct) {
      res.status(200).json(findProduct);
    }
  } catch (error) {
    res.status(500);
    console.log("lỗi nè: ", error);
    throw new Error("Không tìm thấy product");
  }
});

//filter category
route.get("/category/:cateName", async (req, res) => {
  const { cateName } = req.params;
  try {
    const cateProduct = await Product.find({ categorySlug: cateName });
    if (cateProduct) {
      res.status(200).json(cateProduct);
    }
  } catch (error) {
    res.status(500);
    console.log("lỗi nè: ", error);
    throw new Error("Không tìm thấy category");
  }
});

// search product by name
route.post("/search", async (req, res) => {
  const { searchText } = req.body;
  
  let encodedData = Buffer.from(searchText, 'utf8').toString('base64');
  encodedData = encodedData.replace(/\//g, '_').replace(/\+/g, '-');

  let decodedData = encodedData.replace(/_/g, '/').replace(/-/g, '+');
  decodedData = Buffer.from(decodedData, 'base64').toString('utf8');

  try {
    const products = await Product.find();
    if (products) {
      const dataSearch = products.filter((item) => {
        let productName = item.productName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        let searchTextLower = decodedData
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        productName = productName.replace("đ", "d");
        searchTextLower = searchTextLower.replace("đ", "d");
      
        return productName.includes(searchTextLower);
      });
      res.status(200).json(dataSearch);
    }
  } catch (error) {
    res.status(500);
    throw new Error("Không tìm thấy category");
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
