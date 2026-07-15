import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-red-500">Payment Cancelled</h1>

      <Link
        to="/checkout"
        className="mt-10 bg-orange-500 text-white px-6 py-3 rounded"
      >
        Back To Checkout
      </Link>
    </div>
  );
};

export default PaymentCancel;
