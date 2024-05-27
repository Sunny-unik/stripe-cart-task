import { useContext, useState } from "react";
import GlobalContext from "../GlobalContexts";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PKvlfSAkmoXMCp79M4XfRpoVXPACnCfnFAHhGrnFfXYtKd1WxXotNAMtbLX7ycF0UjFGHU2K87pkj8OR8dz1rjC00jLirXLpr"
);
export default function Cart() {
  const { removeFromCart, loading, user, emptyCart, cartItems } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  let totalPrice = 0;
  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/payment/create-checkout-session",
        { amount: totalPrice },
        {
          headers: {
            Authorization: `Bearer sk_test_51PKvlfSAkmoXMCp76iTuW9t00bVAjyYQ7Zl8hAABRpa6PluUMq9YxZ9dj8UwoQDUa4hEaZnoWkNaDZxsOPC0GA3B00PP25zmmD`,
          },
          withCredentials: true,
        }
      );
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        alert(result.error.message);
        console.log(result.error);
      }
    } catch (error) {
      console.log(error.message || "Internal server error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <br />
      <button className="btn btn-danger float-end" onClick={emptyCart}>
        Empty Cart
      </button>
      <h1 className="font-bold mb-4">Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => {
            totalPrice += +item.price;
            return (
              <div key={item.id} className="bg-white rounded border p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-900 font-semibold">
                      Price: {item.price}
                    </p>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="d-flex align-items-center justify-content-end">
            <div>
              <span className="me-3">Total amount: ${totalPrice}</span>
              <button className="btn btn-success" onClick={handlePayment}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
