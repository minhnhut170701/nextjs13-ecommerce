import express, { json } from "express";
import dotenv from "dotenv";
import cros from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import productRoute from "./routes/ProductRoute.js";
import userRoute from "./routes/UserRoute.js";
import commentRoute from "./routes/CommentRoute.js";
import cartRoute from "./routes/CartRoute.js";
import orderRoute from "./routes/OrderRoute.js";

dotenv.config();

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_KEY)
      .then((data) => console.log("Kết nối DB"))
      .catch((error) => console.log("Lỗi nè: ", error));
  } catch (error) {
    console.log("Not connect DB", error);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cros());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/comment", commentRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

connectMongo();

app.listen(3003 || process.env.PORT, () => console.log("server running 3003"));
