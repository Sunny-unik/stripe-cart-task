import { useContext } from "react";
import GlobalContext from "../GlobalContexts";
import ProductCard from "../components/ProductCard";

export default function ProductListing() {
  const { products } = useContext(GlobalContext);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
