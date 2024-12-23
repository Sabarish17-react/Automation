import React from "react";
import ReactEcharts from "echarts-for-react";

function HalfpieChart(props) {
  const gaugeData = [
    {
      value: props.chartData,

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
        center: ["50%", "70%"],
        startAngle: 200,
        endAngle: -20,

        itemStyle: {
          color: "#003366",
        },
        progress: {
          show: true,
          width: 15,
        },

        pointer: {
          show: false,
        },
        radius: 100,
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },

        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "65%",

          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 35,
          fontWeight: "bolder",
          formatter: "{value} %",
          color: "#000000",
        },
        data: gaugeData,
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      style={{
        height: Number(props.chartHeight),
        width: "100%",
        height: 235,
      }}
    />
  );
}
export default HalfpieChart;
