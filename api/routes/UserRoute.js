import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const route = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

// resgister
route.post("/register", async (req, res) => {
  const { userName, email, password, isAdmin } = req.body;
  try {
    if (!userName || !email || !password) {
      throw new Error("Nhập đầy đủ thông tin vào");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // const checkUser = await User.findOne({email: email})

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      isAdmin,
    });

    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        name: newUser.userName,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    res.status(500);
    console.log("Lỗi api kìa pa: ", error);
  }
});

// login
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const logInUser = await User.findOne({ email });
    if (logInUser) {
      const passwordMatch = await bcrypt.compare(password, logInUser.password);
      if (passwordMatch) {
        res.status(200).json({
          _id: logInUser._id,
          name: logInUser.userName,
          email: logInUser.email,
          token: generateToken(logInUser._id),
        });
      } else {
        res.status(400).json({
          message: "Mật khẩu hoặc tài khoản không đúng",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getuser
route.get("/all", async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send("Lỗi api");
  }
});

export default route;
