import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const response = await fetch("/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      alert("payment failed");
      setMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="float-top w-100">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <p>{message}</p>
    </form>
  );
};

export default StripeForm;
