import { useEffect, useState } from "react";

import { getAllPayments } from "../../api/payment";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      const items = await getAllPayments();
      const { transactions } = items.data;
      setTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold underline md:text-3xl md:font-bold md:block">
            Users in Farmlytics
          </h1>
        </div>
        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead className="text-xl">
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">User ID</th>
                <th className="px-4 text-left">Product</th>
                <th className="px-4 text-left">Price</th>
                <th className="px-4 text-left">Currency</th>
                <th className="px-4 text-left">Paid on</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {transactions?.map(
                (
                  { userId, product, price, currency, createdAt, _id },
                  index
                ) => (
                  <tr
                    key={_id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "" : "",
                    }}
                  >
                    <td className="px-4 py-2">{index + 1} .</td>
                    <td className="px-4 py-2">{userId}</td>
                    <td className="px-4 py-2">{product}</td>
                    <td className="px-4 py-2">₹{price}</td>
                    <td className="px-4 py-2">{currency}</td>
                    <td className="px-4 py-2">{createdAt}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminTransactions;
