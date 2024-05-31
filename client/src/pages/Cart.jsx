import { useContext } from "react";
import GlobalContext from "../GlobalContexts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { removeFromCart, loading, user, emptyCart, cartItems, handlePayment } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  let totalPrice = 0;
  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, []);

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
              <span className="me-3">Total amount: {totalPrice}</span>
              <button
                className="btn btn-success"
                onClick={() => handlePayment(totalPrice)}
              >
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
