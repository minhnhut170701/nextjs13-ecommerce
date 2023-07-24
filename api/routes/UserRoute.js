import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
    const hasUser = await User.findOne({email: email})

    if(hasUser){
      res.status(400).send("Đã tồn tại user")
      throw new Error("Đã có user");
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
          isAdmin: logInUser.isAdmin,
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

// find user by email
route.post("/find/email", async (req, res) => {
  const {email} = req.body
  try {
    const user = await User.findOne({email: email });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send("Lỗi api");
  }
});


// delete user
route.delete("/remove/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user) {
      res.status(200).send("Xóa người dùng thành công");
    } else {
      res.status(404).send("Không tìm thấy người dùng");
    }
  } catch (error) {
    res.status(500).send("Lỗi api");
  }
});


route.post('/forgot', async (req, res) =>{
  const { email } = req.body;

  try {
    // Find the user with the provided email in the database
    const user = await User.findOne({ email });

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique token for password reset
    const token = generateToken(user._id);

    // Save the token to the user's account in the database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)

    // Save the user with the token to the database

    await user.save();

    // Send the password reset email to the user's email address
    const transporter = nodemailer.createTransport({
      // Configure your email provider here, e.g., Gmail or SMTP
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADRESS, // Replace with your email
        pass: process.env.EMAIL_PASSWORD, // Replace with your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADRESS,
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      https://nextjs13-ecommerce-five.vercel.app/authenticate/accpet?token=${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ message: 'Password reset link sent successfully' });
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


route.post("/reset", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Find the user with the provided token in the database
    const user = await User.findOne({ resetPasswordToken: token });

    // If the token is not found or has expired, return an error response
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Hash the new password and update the user's password in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    user.resetPasswordToken = '';
    user.resetPasswordExpires = '';

    // Save the updated user in the database
    await user.save();

    // Send a success response
    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default route;
