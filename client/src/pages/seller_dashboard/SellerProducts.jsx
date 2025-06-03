import React, { useState, useEffect } from "react";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";
import { useDispatch } from "react-redux";
import { editProductDetails } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import useProducts from "../../hooks/products/useProducts";

function SellerProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getSellerProducts, deleteProduct } = useProducts();

  const [data, setData] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [indexOfProduct, setIndexOfProduct] = useState(-1);

  // Fetch Products
  const getProducts = async () => {
    try {
      setIsDataFetching(true);
      const productData = await getSellerProducts();
      setData(productData || []); // Handle null/undefined response
    } catch (error) {
      notify("Failed to fetch products", "error");
    } finally {
      setIsDataFetching(false);
    }
  };

  // Delete Product
  const handleDelete = async (productId, index) => {
    if (isDeleting) {
      notify("Please wait", "info");
      return;
    }

    try {
      setIsDeleting(true);
      setIndexOfProduct(index);
      await deleteProduct(productId);
      notify("Product deleted successfully", "success");
      setData((prevData) => prevData.filter((_, i) => i !== index)); // Remove from local state
    } catch (error) {
      notify("Failed to delete product", "error");
    } finally {
      setIsDeleting(false);
      setIndexOfProduct(-1);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Heading text={"Your Products"} textAlign="text-left" />
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
        <div className="mt-1 relative w-full md:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for products (Coming soon)"
          />
        </div>
        <Link to="add" className="w-full md:w-fit text-center">
          <div className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700">
            <i className="fa-regular fa-plus mr-2"></i>Add Product
          </div>
        </Link>
      </div>
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isDataFetching ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStateText text="Your seller dashboard currently does not display any products. To start selling, kindly add your products by navigating to the 'Add Product' section." />
          ) : (
            <table className="text-center text-sm font-light w-full">
              <thead className="border-b font-medium bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Shelf Life</th>
                  <th>Quantity Left</th>
                  <th>Location</th>
                  <th>Delivery Radius</th>
                  <th>Minimum Order Quantity</th>
                  <th>Measuring Unit</th>
                  <th>Price Per Unit</th>
                  <th>Description</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-neutral-100 text-center"
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.image} alt="Product" loading="lazy" />
                    </td>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.shelfLife}</td>
                    <td>
                      {item.quantity} {item.measuringUnit}
                    </td>
                    <td
                      className="cursor-pointer text-sky-700 hover:underline"
                      onClick={() =>
                        navigate(
                          `/map/${item.location.coordinates[1]}/${item.location.coordinates[0]}`
                        )
                      }
                    >
                      {item.location?.coordinates?.[1]?.toFixed(4)},{" "}
                      {item.location?.coordinates?.[0]?.toFixed(4)}
                    </td>
                    <td>{item.deliveryRadius} km</td>
                    <td>{item.minimumOrderQuantity}</td>
                    <td>{item.measuringUnit}</td>
                    <td>
                      Rs. {item.pricePerUnit}/{item.measuringUnit}
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <div
                          className="py-2 px-4 bg-sky-700 text-white rounded cursor-pointer"
                          onClick={() => {
                            dispatch(editProductDetails(item));
                            navigate(`edit`);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="py-2 px-4 bg-rose-700 text-white rounded cursor-pointer"
                          onClick={() => handleDelete(item._id, index)}
                        >
                          {indexOfProduct === index ? (
                            <Spinner width="w-5" color="#ffffff" />
                          ) : (
                            "Delete"
                          )}
                        </div>
                      </div>
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

export default SellerProducts;
