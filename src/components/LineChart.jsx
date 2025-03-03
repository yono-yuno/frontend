import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  layouts,
  Filler,
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
        LineElement,
        Filler
      );

      const thisMonthData = [
        0, 20, 30, 40, 50, 60, 60, 80, 120, 150, 150, 150, 160, 200, 210, 212,
        220, 600,
      ];
      const lastMonthData = [
        0, 20, 40, 40, 50, 60, 70, 80, 100, 150, 150, 180, 200, 200, 210, 212,
        280, 300, 301, 302, 303, 314, 320, 340, 350, 355, 355, 360, 410, 420,
        480,
      ];

      const pointRadius = (data) =>
        data.map((_, index) => (index === data.length - 1 ? 3 : 0));

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
              label: "ThisMonth",
              data: thisMonthData,
              borderColor: "#FC6767",
              pointBackgroundColor: "#FC6767", // 반투명한 빨간색
              pointRadius: pointRadius(thisMonthData), // 포인트 크기
              pointBorderColor: "rgba(252,103,103,0.3)", // 테두리 색상
              pointBorderWidth: 10, // 테두리 두께
              fill: false, // 라인 그래프에서 영역 채우기 비활성화
              borderWidth: 2.5,
              tension: 0.8,
            },
            {
              label: "LastMonth",
              data: lastMonthData,
              borderColor: "rgba(178, 184, 192, 1)",
              pointRadius: 0, // 포인트 크기
              borderWidth: 2.5,
              fill: "start",
              backgroundColor: "rgba(178, 184, 192, 0.1)",
              tension: 0.8,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
              beginAtZero: true,
            },
          },
          layout: {
            padding: -100,
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
