import { useEffect, useState } from "react";
import { pricingData } from "../../utils/constants";
import PriceCard from "../landing/PriceCard";
import { loadStripe } from "@stripe/stripe-js";
import { getUserPayments } from "../../api/payment";

const PricingArea = () => {
  const { heading, subHead, plans } = pricingData;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const items = await getUserPayments();
      const { transactions } = items.data;
      setTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (price: number) => {
    const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PK}`);

    const body = {
      price,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/payment/create-checkout-session`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  };
  return (
    <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
      <div className="flex flex-col items-center w-full gap-4">
        {" "}
        <div className="flex flex-col items-center">
          <h1 className="text-[32px] font-medium md:text-hero md:font-semibold text-center">
            {heading}
          </h1>
          <p className="text-center md:text-2xl text-subHead">{subHead}</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-2 md:max-w-[920px]">
          {plans.map(
            ({ heading, subHead, price, priceDesc, features, renewal }, id) => (
              <div key={id} onClick={() => makePayment(price)}>
                <PriceCard
                  heading={heading}
                  subHead={subHead}
                  price={price}
                  priceDesc={priceDesc}
                  features={features}
                  renewal={renewal}
                />
              </div>
            )
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-left">Payment History</h1>
        </div>
        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead className="text-fuchsia-200">
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Product</th>
                <th className="px-4 text-left">currency</th>
                <th className="px-4 text-left">Price</th>
                <th className="px-4 text-left">Paid on</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map(
                ({ product, price, currency, createdAt, _id }, index) => (
                  <tr
                    key={_id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "" : "",
                    }}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{product}</td>
                    <td className="px-4 py-2">{price}</td>
                    <td className="px-4 py-2">{currency}</td>
                    <td className="px-4 py-2">{createdAt}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingArea;
