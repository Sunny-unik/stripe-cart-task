import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PKvlfSAkmoXMCp79M4XfRpoVXPACnCfnFAHhGrnFfXYtKd1WxXotNAMtbLX7ycF0UjFGHU2K87pkj8OR8dz1rjC00jLirXLpr"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);