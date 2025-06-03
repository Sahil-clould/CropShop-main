import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import useOrder from "../../hooks/orders/useOrder";

function SellerOrderRequests() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // Controlled input
  const navigate = useNavigate();

  const { getSellerOrders, isLoading } = useOrder();

  const getOrders = async () => {
    try {
      const orderedData = await getSellerOrders();
      setData(orderedData || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {/* Table Header */}
      <Heading text={"All Orders"} textAlign="text-left" />
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
        <div className="mt-1 relative w-full md:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for products (Coming soon)"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Controlled input
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isLoading ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStateText text="It seems like your order request queue is currently empty. No worries, though! Keep an eye out for incoming orders—they'll pop up right here in your dashboard." />
          ) : (
            <table className="text-center text-sm font-light w-full">
              <thead className="border-b font-medium bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Image</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Product Name</th>
                  <th scope="col" className="px-6 py-4">Order Date</th>
                  <th scope="col" className="px-6 py-4">Customer Name</th>
                  <th scope="col" className="px-6 py-4">Customer Phone</th>
                  <th scope="col" className="px-6 py-4">Customer Email</th>
                  <th scope="col" className="px-6 py-4">Order Quantity</th>
                  <th scope="col" className="px-6 py-4">Order Location</th>
                  <th scope="col" className="px-6 py-4">Total Price</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 text-center"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-2">
                      <img
                        src={item.productId?.image || ""}
                        alt={item.productId?.name || "Product"}
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-4">{item.productId?.category || "N/A"}</td>
                    <td className="px-6 py-4">{item.productId?.name || "N/A"}</td>
                    <td className="px-6 py-4">{item.date || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId?.name || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId?.contact || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId?.email || "N/A"}</td>
                    <td className="px-6 py-4">
                      {item.orderQty} {item.productId?.measuringUnit || ""}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer font-medium text-sky-700 hover:underline whitespace-nowrap"
                      onClick={() => {
                        const coords = item.orderLocation?.coordinates || [];
                        if (coords.length === 2) {
                          navigate(`/map/${coords[1]}/${coords[0]}`);
                        }
                      }}
                    >
                      {item.orderLocation?.coordinates?.length === 2
                        ? `${item.orderLocation.coordinates[1].toFixed(4)}, ${item.orderLocation.coordinates[0].toFixed(4)}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">Rs.{item.totalAmount || 0}</td>
                    <td className="px-6 py-4 text-yellow-500 font-medium">
                      <span className="flex justify-center items-center">
                        <GoDotFill className="mr-1" />
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default SellerOrderRequests;
