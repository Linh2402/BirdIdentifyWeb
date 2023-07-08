import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";

function LineChart({data}) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const chartData = [["Date", "Count"]];
      data.forEach((item) => {
        chartData.push([item.date, item.count]);
      });

      setChartData(chartData);
    }
  }, [data]);

  return (
    <div>
      {chartData && (
        <Chart
          width={"100%"}
          height={300}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            hAxis: {
              title: "Date",
            },
            vAxis: {
              title: "Count",
            },
          }}
        />
      )}
    </div>
  );
}

export default LineChart;
