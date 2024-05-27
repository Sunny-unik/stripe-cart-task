const bcrypt = require("bcrypt");
const UserSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const productSchema = require("../models/productSchema");
const userSchema = require("../models/userSchema");

const createUser = async ({ name, email, password }) => {
  const user = new UserSchema({ name, email, password });

  await user.validate();
  const encryptedPassword = await bcrypt.hash(password, 10);
  user.password = encryptedPassword;
  return {
    ...(await user.save({ validateBeforeSave: false }))?._doc,
    password: undefined,
  };
};

const signup = async (req, res, next) => {
  try {
    const data = await createUser(req.body);
    res.send({ data, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Wrong Password" });

    const jwtData = { userId: user._id };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .cookie("token", token, {
        sameSite: "None",
        secure: true,
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .send({
        message: "Login successful",
        data: { ...user._doc, password: undefined },
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("token", {
        sameSite: "None",
        secure: true,
        path: "/",
        httpOnly: true,
      })
      .json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) throw new Error("Internal Server Error");

    const product = await productSchema.findById(productId);
    if (!product) throw new Error("Product not found");

    const user = await userSchema.findById(req.decoded.userId);
    if (!user) throw new Error("User not found");

    if (user.cartItems.includes(productId))
      return res.send({
        data: user,
        message: "This product is already in cart",
      });

    user.cartItems.push(productId);
    await user.save({ validateBeforeSave: false });

    res.send({
      message: "Cart Updated",
      data: { ...user._doc, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = await userSchema.findById(req.decoded.userId);
    if (!user) throw new Error("User not found");

    const Updated = user.cartItems.filter((id) => {
      return id !== productId;
    });
    user.cartItems = Updated;
    await user.save({ validateBeforeSave: false });

    res.send({
      message: "Cart Updated",
      data: { ...user._doc, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

const emptyCart = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.decoded.userId);
    if (!user) throw new Error("User not found");

    user.cartItems = [];
    await user.save({ validateBeforeSave: false });

    res.send({
      message: "Cart Updated",
      data: { ...user._doc, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  addToCart,
  removeFromCart,
  emptyCart,
};
