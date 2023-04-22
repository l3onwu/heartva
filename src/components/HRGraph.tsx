import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../lib/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HRGraph() {
  const { userHook } = useGlobalContext();

  let x = userHook?.activities
    ?.map((act) => {
      return (
        (Math.round((act?.moving_time / (act?.distance / 1000) / 60) * 100) /
          100) *
        20
        // act?.average_heartrate
      );
    })
    ?.reverse();

  let y = userHook?.activities
    ?.map((act) => {
      return (
        // Math.round((act?.moving_time / (act?.distance / 1000) / 60) * 100) /
        //   100 +
        act?.average_heartrate
      );
    })
    ?.reverse();

  const options = {
    tension: 0.3,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        // display: false,
        grid: {
          // color: "#222222",
          color: "transparent",
        },
      },
      y: {
        grid: {
          color: "#222222",
          // color: "transparent",
        },
      },
    },
    plugins: {
      // legend: {
      //   position: "top" as const,
      // },
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
  };

  const data = {
    // labels: userHook?.activities
    //   ?.map((act) => {
    //     return act?.name;
    //   })
    //   ?.reverse(),
    labels: userHook?.activities
      ?.map((act) => {
        return act?.distance;
      })
      ?.reverse(),
    // labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Heartrate",
        data: y,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 1,
        // tension: 0.2,
      },
      {
        label: "Pace",
        data: x,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointRadius: 1,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
