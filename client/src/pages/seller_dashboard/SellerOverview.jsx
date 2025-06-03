import React, { useState, useEffect } from "react";
import Heading from "../../components/heading/Heading";
import AreaGraph from "../../components/graphs/AreaGraph";
import BarGraph from "../../components/graphs/BarGraph";
import GraphSkeleton from "../../components/skeleton/GraphSkeleton";
import useGraph from "../../hooks/graph/useGraph";
import EmptyStateText from "../../components/empty_state/EmptyStateText";

function SellerOverview() {
  const { visualizeSalesData, isLoading } = useGraph();

  const [dateVsSales, setDateVsSales] = useState([]);
  const [categoryVsSales, setCategoryVsSales] = useState([]);

  const visualizeData = async () => {
    try {
      const graphData = await visualizeSalesData();

      // Validate the response structure
      if (
        graphData &&
        Array.isArray(graphData.dateVsSales) &&
        Array.isArray(graphData.categoryVsSales)
      ) {
        setDateVsSales(graphData.dateVsSales);
        setCategoryVsSales(graphData.categoryVsSales);
      } else {
        console.error("Invalid data format received:", graphData);
        setDateVsSales([]);
        setCategoryVsSales([]);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setDateVsSales([]);
      setCategoryVsSales([]);
    }
  };

  useEffect(() => {
    visualizeData();
  }, []);

  return (
    <>
      {/* Table Header */}
      <Heading text={"Visualize Your Sales"} textAlign="text-left" />
      {isLoading ? (
        <GraphSkeleton noOfBoxes={2} />
      ) : dateVsSales.length === 0 ? (
        <EmptyStateText text="No orders have been placed. Check back soon!" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-4 px-4">
          <AreaGraph
            title="Date v/s Sales"
            lineData={dateVsSales}
            color={"#be123c"}
            xKey={"date"}
            yKey={"totalSales"}
          />
          <BarGraph
            title="Category v/s Sales"
            data={categoryVsSales}
            color={"#be123c"}
            xKey={"category"}
            yKey={"totalSales"}
          />
        </div>
      )}
    </>
  );
}

export default SellerOverview;
