import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

// 컴포넌트를 정의하고, react-chartjs-2 차트에서 가져온 Doughnut 컴포넌트에 data 전달
const PieChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [
      {
        // 각 항목에 대한 데이터
        data: props.data,
        // 각 항목별 컬러
        backgroundColor: props.color,
        // 테두리 컬러
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };
  return <Pie data={chartData} />;
};

export default PieChart;
