import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const LineChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement
      );
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
          ],
          datasets: [
            {
              label: "LastMonth",
              data: [
                0, 20, 30, 40, 50, 60, 60, 80, 120, 150, 150, 150, 160, 200,
                210, 212, 220, 300, 301, 302, 303, 304, 320, 330, 331, 332, 339,
                350, 400, 400, 401,
              ],
              borderColor: "rgba(221, 82, 87, 1)",
              pointRadius: 0, // 포인트 크기
              fill: false, // 라인 그래프에서 영역 채우기 비활성화
            },
            {
              label: "ThisMonth",
              data: [
                0, 20, 40, 40, 50, 60, 70, 80, 100, 150, 150, 180, 200, 200,
                210, 212, 280, 300, 301, 302, 303, 314, 320, 340, 350, 355, 355,
                360, 410, 420, 480,
              ],
              borderColor: "rgba(178, 184, 192, 1)",
              pointRadius: 0, // 포인트 크기
              fill: false, // 라인 그래프에서 영역 채우기 비활성화
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
              beginAtZero: true,
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    const initializeChart = () => {
      destroyChart(); // 이전 차트 파괴
      createChart(); // 새로운 차트 생성
    };

    // 컴포넌트가 처음 렌더링될 때 차트 초기화
    initializeChart();

    // 컴포넌트가 unmount될 때 차트 파괴
    return () => {
      destroyChart();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;
