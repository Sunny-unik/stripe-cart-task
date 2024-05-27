const express = require("express");
const Stripe = require("stripe");
const auth = require("../middleware/auth");
const userSchema = require("../models/userSchema");
const productSchema = require("../models/productSchema");
require("dotenv").config();

const paymentRoutes = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

paymentRoutes.post("/create-checkout-session", auth, async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "product title",
              description: "product description",
            },
            unit_amount: amount * 100, // amount in paise
          },
          quantity: 1,
        },
      ],
      customer: "cus_QBPPHJ1NVnPfWi",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"], // Restrict shipping to India
      },
      //   shipping: {
      //     name: "John Doe",
      //     address: {
      //       line1: "510 Townsend St",
      //       postal_code: "98140",
      //       city: "San Francisco",
      //       state: "CA",
      //       country: "US",
      //     },
      //   },
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.log(error, " error");
    res.status(500).send({ error: error.message });
  }
});

module.exports = paymentRoutes;
