import { useContext } from "react";
import GlobalContext from "../GlobalContexts";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(GlobalContext);
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">${product.price}</span>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
