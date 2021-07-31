import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ],
  datasets: [
    {
      backgroundColor: "#50FFAE",
      data: [200000, 600000, 300000, 800000, 400000, 270000],
      borderColor: "rgb(0, 138, 255)",
      borderWidth: 3,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    y: {
      beginAtzero: true,
    },
  },
};

const Chartproduct = () => (
  <div>
    <Line type="line" data={data} options={options} />
  </div>
);

export default Chartproduct;
