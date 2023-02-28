import express from "express";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";

const route = express.Router();

const discountArray = ["nhutdeptrai"];

// get array cart
route.get("/:userId", async (req, res) => {
  try {
    const getCart = await User.findById(req.params.userId).populate("cart");

    if (getCart) {
      res.status(200).json(getCart.cart);
    }
  } catch (error) {
    res.status(500).json({
      message: "Lỗi API",
    });
  }
});

// create cart item
route.post("/addItem/:userId", async (req, res) => {
  const { productName, banner, price, qty } = req.body;
  const { userId } = req.params;
  try {
    // Find the user's cart
    const user = await User.findById(userId).populate("cart");

    // Find the cart item that matches the product name
    const cartItem = user.cart.find((item) => item.productName === productName);

    if (cartItem) {
      // Update the cart item's quantity and total
      cartItem.qty += qty;
      cartItem.total += price * qty;

      await cartItem.save();
      res.status(200).json({
        message: "Successful AddToCart",
      });
    } else {
      const addCart = new Cart({
        productName,
        banner,
        price,
        qty,
        total: price * qty,
      });

      user.cart.push(addCart);
      await user.save();
      await addCart.save();
      res.status(200).json({
        message: "Successful AddToCart",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Loi API",
    });
  }
});

// increment
route.put("/increment/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cart.qty++;
    cart.total = cart.qty * cart.price;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// decrement
route.put("/decrement/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    if (cart.qty === 1) {
      cart.qty = 1;
    } else {
      cart.qty--;
    }
    cart.total = cart.qty * cart.price;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// detele one item
route.delete("/deleteItem/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const cart = await Cart.findById(itemId);
    if (cart) {
      const user = await User.findOneAndUpdate(
        { cart: cart._id },
        { $pull: { cart: cart._id } },
        { new: true }
      );
      await cart.delete();
      res.status(200).json({
        message: "Success delete item",
      });
    } else {
      res.status(404).json({
        message: "Cart item not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// clean data cart
route.post("/clearCart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and get the cart array
    const user = await User.findById(userId);
    const cartIds = user.cart;

    // Remove all cart items from the user model
    user.cart = [];
    await user.save();

    // Remove all cart items from the cart model
    await Cart.deleteMany({ _id: { $in: cartIds } });

    res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// apply discount
route.put("/applyDiscount/:cartId", async (req, res) => {
  const { discount } = req.body;
  try {
    const cart = await Cart.findById(req.params.cartId);
    const chekDiscount = discountArray.find((item) => item === discount);
    const oldTotal = cart.total;
    if (chekDiscount) {
      cart.total = (cart.total / 100) * 90;
      await cart.save();
      res.status(200).json({
        oldPrice: oldTotal,
        newPrice: cart.total,
      });
    } else {
      res.status(400).json({ message: "dont found any discount" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default route;
