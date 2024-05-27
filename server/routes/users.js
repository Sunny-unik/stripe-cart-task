const express = require("express");
const userSchema = require("../models/userSchema");
const {
  login,
  logout,
  signup,
  addToCart,
  removeFromCart,
  emptyCart,
} = require("../controllers/user");
const auth = require("../middleware/auth");

const userRoutes = express.Router();

userRoutes.get("/auth", auth, async (req, res, next) => {
  try {
    const { userId } = req.decoded;
    const user = await userSchema.findById(userId);
    res.send({
      data: { ...user?._doc, password: undefined },
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
});
userRoutes.post("/", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.put("/addToCart", auth, addToCart);
userRoutes.put("/removeFromCart", auth, removeFromCart);
userRoutes.put("/emptyCart", auth, emptyCart);

module.exports = userRoutes;
