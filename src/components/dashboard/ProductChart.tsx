import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Card } from "react-bootstrap";

// Components
import Message from "components/common/Message";
import Loader from "components/common/Loader";

// API
import { getProductCountByCategory } from "api/";

// Utils
import { convertToPlainArray } from "utils/array-helpers";

const ProductChart = () => {
  // Query
  const { data, isFetched, isError, error }: any = useQuery({
    queryKey: ["get_product_stats"],
    queryFn: getProductCountByCategory,
  });

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
      },
      xAxis: {
        type: "category",
        data: convertToPlainArray(data?.data, "name"),
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          // For Unique Color
          // data: [
          //   120,
          //   {
          //     value: 200,
          //     itemStyle: {
          //       color: "#a90000", // Unique color for bar
          //     },
          //   },
          // ],

          name: "Product",
          data: convertToPlainArray(data?.data, "count"),
          type: "bar",
          barWidth: "20%",
        },
      ],
    };
  }, [data]);

  return (
    <Card className="card-chart">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>Product Stats</h5>
      </Card.Header>
      <Card.Body className="px-1">
        {!isFetched && <Loader />}

        {isFetched && !isError && (
          <ReactECharts
            option={option}
            style={{ height: "350px", width: "100%" }}
          />
        )}

        {isError && (
          <Message
            className="d-flex justify-content-center align-items-center"
            message={error?.message}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductChart;
