import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Payment Successful!</h4>
        <p>
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <hr />
        <p className="mb-0">
          You can now return to the <Link to="/">home page</Link>.
        </p>
      </div>
    </div>
  );
};

export default Success;
