const express = require("express");
const productSchema = require("../models/productSchema");

const productRoutes = express.Router();

productRoutes.get("/", async (req, res) => {
  try {
    const products = await productSchema.find({});
    res.send({ data: products, message: "Products retrived successsfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = productRoutes;
