import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../api/endpoints";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    completeOrder();
  }, []);

  const completeOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const session_id = searchParams.get("session_id");

      const address = localStorage.getItem("deliveryAddress");

      if (!address) {
        toast.error("Delivery address not found");
        navigate("/checkout");
        return;
      }

      const response = await fetch(API.CHECKOUT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_address: address,
          payment_method: "stripe",
          transaction_id: session_id,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        localStorage.removeItem("deliveryAddress");

        toast.success("Order Placed Successfully");

        navigate("/orders");
      } else {
        toast.error(data.error || "Checkout Failed");

        navigate("/checkout");
      }
    } catch (err) {
      console.log(err);

      toast.error("Server Error");

      navigate("/checkout");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-5xl text-orange-600">Processing Payment...</h1>
    </div>
  );
};

export default PaymentSuccess;
