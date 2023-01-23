//@ts-nocheck
"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ cash, payme, fps, octopus, tapngo }) => {
  const data = {
    labels: ["Cash", "Payme", "FPS", "Octopus", "TapnGo"],
    datasets: [
      {
        label: "My First Dataset",
        data: [cash, payme, fps, octopus, tapngo],
        backgroundColor: [
          "#65b5ff",
          "#FF2828",
          "#97ff87",
          "#ffa982",
          "#4f7f8a",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // const data = {
  //   labels: ["Red", "Blue", "Yellow"],
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [300, 50, 100],
  //       backgroundColor: [
  //         "rgb(255, 99, 132)",
  //         "rgb(54, 162, 235)",
  //         "rgb(255, 205, 86)",
  //       ],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  const options = {};

  

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
