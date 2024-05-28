import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Payment Cancelled</h4>
        <p>
          Your payment was not completed. If you have any questions, please
          contact support.
        </p>
        <hr />
        <p className="mb-0">
          You can try again or return to the <Link to="/">home page</Link>.
        </p>
      </div>
    </div>
  );
};

export default Cancel;
