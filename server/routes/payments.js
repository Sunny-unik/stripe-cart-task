const express = require("express");
const Stripe = require("stripe");
const auth = require("../middleware/auth");
require("dotenv").config();

const paymentRoutes = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

paymentRoutes.post("/create-checkout-session", auth, async (req, res) => {
  const { amount } = req.body;
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
            unit_amount: +(amount * 100).toFixed(2), // amount in paise
          },
          quantity: 1,
        },
      ],
      customer: process.env.CUSTOMER_ID,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"], // Restrict shipping to India
      },
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
