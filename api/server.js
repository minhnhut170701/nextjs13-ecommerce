import express, { json } from "express";
import dotenv from "dotenv";
import cros from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoute from "./routes/ProductRoute.js";
import userRoute from "./routes/UserRoute.js";

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

const app = express();
app.use(cros());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

connectMongo();

app.listen(3003, () => console.log("server running 3003"));
