import React from "react";
import ReactEcharts from "echarts-for-react";

function GaugechartNew(props) {
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
        max: 100,
        min: 0,

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
        radius: "85%",

        axisLine: {
          lineStyle: {
            width: 20,
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
        data: [100],
        title: {
          fontSize: 30,
        },
        detail: {
          show: false,
        },
      },
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        max: 100,
        min: 0,

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
            color: "#ffe066",
          },
        },
        radius: "75%",

        axisLine: {
          lineStyle: {
            width: 15,
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
          formatter: "{value}%",
        },
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: Number(props.chartHeight), width: "90%" }}
    />
  );
}
export default GaugechartNew;
