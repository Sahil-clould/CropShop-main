import React from "react";
import useHttpClient from "../api/useHttpClient";
import { GRAPH } from "../../constants/apiEndpoints";

const useGraph = () => {
  const { sendAuthorizedRequest, isLoading } = useHttpClient();

  const visualizeSalesData = async () => {
    try {
      const res = await sendAuthorizedRequest("seller", GRAPH, "GET");

      // Validate response structure
      if (!res || typeof res !== "object" || !res.data) {
        console.error("Invalid response structure:", res);
        return { dateVsSales: [], categoryVsSales: [] }; // Return default structure
      }

      const { dateVsSales, categoryVsSales } = res.data;

      // Additional validation for nested fields
      if (!Array.isArray(dateVsSales) || !Array.isArray(categoryVsSales)) {
        console.error("Invalid data format in response:", res.data);
        return { dateVsSales: [], categoryVsSales: [] }; // Return default structure
      }

      console.log("Response Data:", res.data);
      return res.data; // Return the validated response
    } catch (error) {
      console.error("Error fetching sales data:", error);
      return { dateVsSales: [], categoryVsSales: [] }; // Fallback for errors
    }
  };

  return { visualizeSalesData, isLoading };
};

export default useGraph;
