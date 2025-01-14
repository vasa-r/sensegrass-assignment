import Success from "../../assets/success.png";
import Cancel from "../../assets/cancel.png";
import { Link } from "react-router-dom";

const PaymentPopup = ({ status }: { status: "success" | "cancel" }) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center gap-4 w-96 h-96">
        <img src={status === "success" ? Success : Cancel} alt="status image" />
        <h1 className="text-3xl font-bold">
          {status === "success" ? "Payment Successful" : "Payment Canceled"}
        </h1>
        <p className="text-lg font-medium">
          {status === "success"
            ? "Your payment is successful"
            : "Your payment ws canceled"}
        </p>
        <Link
          to={"/"}
          className={`${
            status === "success" ? "bg-green-500" : "bg-red-500"
          } py-2 px-4 rounded-lg text-base font-normal`}
        >
          Return back home
        </Link>
      </div>
    </div>
  );
};

export default PaymentPopup;
