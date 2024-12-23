import React from "react";
import ReactEcharts from "echarts-for-react";

function Gaugechart(props) {
  const gaugeData = [
    {
      value: props.chartData,
      name: props.name,

      title: {
        offsetCenter: ["0%", "30%"],
        fontSize: 20,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "0%"],
      },
    },
  ];

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 270,
        endAngle: -180,

        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
            color: "#003366",
          },
        },
        radius: "75%",

        axisLine: {
          lineStyle: {
            width: 8,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 80,
        },
        data: gaugeData,
        title: {
          fontSize: 30,
        },
        detail: {
          fontSize: 30,
          color: "#000000",
          formatter: "{value}%",
        },
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: Number(props.chartHeight) }}
    />
  );
}
export default Gaugechart;
