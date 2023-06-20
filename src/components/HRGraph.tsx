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
import { AxesType } from "../views/HRGraphPage";
import { ActivityShortType } from "../lib/types";

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

export default function HRGraph({
  chartKey,
  axesOne,
  axesTwo,
  axesThree,
  filteredActivities,
  statsYear,
}: {
  chartKey: any;
  axesOne: AxesType;
  axesTwo: AxesType;
  axesThree: AxesType;
  filteredActivities: ActivityShortType[];
  statsYear: number;
}) {
  const { userHook } = useGlobalContext();

  // Data functions
  let dateLabels = filteredActivities
    ?.filter((act) => {
      return new Date(act?.start_date_local).getFullYear() === statsYear;
    })
    ?.map((act) => {
      return new Date(act?.start_date_local);
    });

  let paceData = filteredActivities
    ?.filter((act) => {
      return new Date(act?.start_date_local).getFullYear() === statsYear;
    })
    .map((act) => {
      return (
        (Math.round((act?.moving_time / (act?.distance / 1000) / 60) * 100) /
          100) *
        20
      );
    });

  let distanceData = filteredActivities
    ?.filter((act) => {
      return new Date(act?.start_date_local).getFullYear() === statsYear;
    })
    .map((act) => {
      return act?.distance / 100;
    });

  let hrData = filteredActivities
    ?.filter((act) => {
      return new Date(act?.start_date_local).getFullYear() === statsYear;
    })
    ?.map((act) => {
      return act?.average_heartrate;
    });

  // Graph config
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
        min: new Date(statsYear, 0, 1, 0, 0, 0),
        max: new Date(statsYear, 11, 30, 23, 59, 59),
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

  // Dataset recipes
  const hrDataSet = {
    label: "HR",
    borderColor: "rgb(255, 0, 0)",
    data: hrData,
    fill: false,
    pointRadius: 0,
    borderWidth: 1.5,
  };

  const paceDataSet = {
    label: "Pace",
    borderColor: "rgb(0, 0, 255)",
    data: paceData,
    fill: false,
    pointRadius: 0,
    borderWidth: 1.5,
  };

  const distanceDataSet = {
    label: "Distance",
    borderColor: "rgb(0, 255, 0)",
    data: distanceData,
    fill: false,
    pointRadius: 0,
    borderWidth: 1.5,
  };

  // Dataset builder
  const aggregateDataSet = () => {
    const totalSet = [];
    for (const ax of [axesOne, axesTwo, axesThree]) {
      if (ax === "heartRate") {
        totalSet.push(hrDataSet);
      } else if (ax === "pace") {
        totalSet.push(paceDataSet);
      } else if (ax === "distance") {
        totalSet.push(distanceDataSet);
      }
    }
    return totalSet;
  };

  const allSets = aggregateDataSet();

  const data = {
    labels: dateLabels,
    datasets: [...allSets],
  };
  {
    // @ts-ignore
    return <Line options={options} data={data} key={chartKey} />;
  }
}
