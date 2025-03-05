import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

// 차트에 사용될 각 항목 라벨명
const labels = ["출산 · 육아", "인테리어", "식품", "패션잡화", "그 외"];

export const data = {
  labels,
  datasets: [
    {
      // 각 항목에 대한 데이터
      data: [30, 20, 18, 14, 18],
      // 각 항목별 컬러
      backgroundColor: ["#93C9FF", "#DB88E7", "#EF4452", "#4E7698", "#D9D9D9"],
      // 테두리 컬러
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

// 컴포넌트를 정의하고, react-chartjs-2 차트에서 가져온 Doughnut 컴포넌트에 data 전달
const PieChart = () => {
  return <Pie data={data} />;
};

export default PieChart;
