import {
  Chart as ChartJS,
  Interaction,
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

// @ts-ignore
import { CrosshairPlugin, Interpolate } from "chartjs-plugin-crosshair";

import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../lib/context";
import { AxesType } from "../views/HRGraphPage";
import { ActivityShortType } from "../lib/types";
import {
  calculatePaceFromDistanceAndTime,
  secondsToMinPace,
} from "../lib/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CrosshairPlugin
);

// @ts-ignore
Interaction.modes.interpolate = Interpolate;

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
  let dateLabels = filteredActivities?.map((act) => {
    return new Date(act?.start_date_local);
  });

  let paceData = filteredActivities.map((act) => {
    return (
      (Math.round((act?.moving_time / (act?.distance / 1000) / 60) * 100) /
        100) *
      20
    );
  });

  let distanceData = filteredActivities.map((act) => {
    return act?.distance / 100;
  });

  let hrData = filteredActivities?.map((act) => {
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
    hover: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      tooltip: {
        // mode: "interpolate",
        intersect: false,
        position: "nearest",
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "rgba(255,255,255,1)",
        titleColor: "black",
        bodyColor: "black",
        cornerRadius: 0,
        caretSize: 0,
        padding: 10,
        // xAlign: "left",
        // yAlign:"bottom",
        displayColors: false,
        callbacks: {
          title: function (tooltipItem: any) {
            const activityObject = filteredActivities[tooltipItem[0].dataIndex];
            const getName = activityObject.name;
            const dateLabel = new Date(
                activityObject?.start_date_local
            ).toLocaleDateString();
            return getName + " | " + dateLabel
          },
          label: function (tooltipItem: any) {
            const activityObject = filteredActivities[tooltipItem.dataIndex];
            const hrLabel = activityObject?.average_heartrate + " bpm";
            const distance =
              filteredActivities[tooltipItem.dataIndex]?.distance;
            const time = filteredActivities[tooltipItem.dataIndex]?.moving_time;
            const paceLabel =
              secondsToMinPace(
                calculatePaceFromDistanceAndTime(distance, time)
              ) + "/km";
            const distanceLabel = Math.round(distance / 10) / 100 + " km";
            const distPaceLabel = distanceLabel + " @ " + paceLabel;
            return [ distPaceLabel, hrLabel];
          },
        },
      },
      crosshair: {
        line: {
          color: "rgba(255, 255, 255, 1)",
          width: 0.5,
        },
        // sync: {
        //     enabled: true,
        // },
        snap: {
          enabled: true,
        },
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
    pointRadius: 2,
    borderWidth: 1.5,
  };

  const paceDataSet = {
    label: "Pace",
    borderColor: "rgb(0, 0, 255)",
    data: paceData,
    fill: false,
    pointRadius: 2,
    borderWidth: 1.5,
  };

  const distanceDataSet = {
    label: "Distance",
    borderColor: "rgb(0, 255, 0)",
    data: distanceData,
    fill: false,
    pointRadius: 2,
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
