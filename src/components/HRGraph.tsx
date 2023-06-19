import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-luxon";

import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../lib/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function HRGraph({ chartKey }: { chartKey: any }) {
  const { userHook } = useGlobalContext();

  let paceData = userHook?.activities
    ?.filter((act) => {
      return (
        new Date(act?.start_date_local).getFullYear() === userHook?.statsYear
      );
    })
    .map((act) => {
      return (
        (Math.round((act?.moving_time / (act?.distance / 1000) / 60) * 100) /
          100) *
        20
      );
    })
    ?.reverse();

  let y = userHook?.activities
    ?.filter((act) => {
      return (
        new Date(act?.start_date_local).getFullYear() === userHook?.statsYear
      );
    })
    ?.map((act) => {
      return act?.average_heartrate;
    })
    ?.reverse();

  let dateLabels = userHook?.activities
    ?.filter((act) => {
      return (
        new Date(act?.start_date_local).getFullYear() === userHook?.statsYear
      );
    })
    ?.map((act) => {
      return new Date(act?.start_date_local);
    });

  let hrData = userHook?.activities
    ?.filter((act) => {
      return (
        new Date(act?.start_date_local).getFullYear() === userHook?.statsYear
      );
    })
    ?.map((act) => {
      return act?.average_heartrate;
    });

  const options = {
    // tension: 0.3,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "month" as const,
          displayFormats: {
            month: "MMM" as const,
          },
        },
        min: new Date(userHook?.statsYear, 0, 1, 0, 0, 0),
        max: new Date(userHook?.statsYear, 11, 30, 23, 59, 59),
      },
      y: {
        grid: {
          color: "#222222",
          lineWidth: 1,
          // color: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
  };

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "HR",
        borderColor: "rgb(255, 0, 0)",
        data: hrData,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Pace",
        borderColor: "rgb(0, 0, 255)",
        data: paceData,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  {
    // @ts-ignore
    return <Line options={options} data={data} key={chartKey} />;
  }
}
