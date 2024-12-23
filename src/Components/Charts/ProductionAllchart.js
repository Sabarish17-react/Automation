import React from "react";
import ReactECharts from "echarts-for-react";

const StackedBarChart = (props) => {
  const dataY1 = props.y1axis;
  const dataY2 = props.y2axis;
  const nameY1 = "VE";
  const nameY2 = "SSI";

  // Define consistent colors for series and legend
  const colorY1 = "#0975c3";
  const colorY2 = "#9ed4fa";
  const highlightColorY1 = "#043253";
  const highlightColorY2 = "#f3ebbf";
  const lowestColorY1 = "#fc0404";
  const lowestColorY2 = "#fcbcbc";

  // Calculate total values
  const totalValues = [];
  for (let i = 0; i < Math.min(dataY1.length, dataY2.length); i++) {
    totalValues.push(+dataY1[i] + +dataY2[i]);
  }

  const maxTotal = Math.max(...totalValues);
  const minTotal = Math.min(...totalValues.filter((val) => val !== 0));
  const maxTotalIndex = totalValues.indexOf(maxTotal);
  const minTotalIndex = totalValues.indexOf(minTotal);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tooltipText = `<div style="font-family: 'Times New Roman'; font-size: 22px; color: #000000; display: flex; flex-direction: column; align-items: center; width:180px; height: 160px;">
                            ${params[0].axisValue}<br/>
                            <hr style="width: 80%; border-color: #003366;" />`;
        params.forEach(function (item) {
          const color = "#000"; // Use the item's color from the series
          tooltipText += `<div style="color: ${color}; width: 100%; text-align: center; padding-top: 20px; justify-content: space-around; align-items: center;">
                            ${item.seriesName}: ${item.data}
                          </div>`;
        });
        tooltipText += "</div>";
        return tooltipText;
      },
    },
    xAxis: {
      type: "category",
      data: props.xaxis,
      name: "Month",
      nameGap: 30,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 24,
        color: "#003366",
        fontFamily: "Times New Roman",
      },
      axisLabel: {
        fontSize: 18, // Increase the font size for x-axis labels
        color: "#000000",
        fontFamily: "Times New Roman",
      },
    },
    yAxis: {
      type: "value",
      name: "Prod .Qty",
      nameGap: 46,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 24,
        color: "#003366",
        fontFamily: "Times New Roman",
      },
      axisLabel: {
        fontSize: 18, // Increase the font size for y-axis labels
        color: "#000000",
        fontFamily: "Times New Roman",
      },
    },
    grid: {
      left: "4%",
      right: "2%",
      bottom: "10%",
      containLabel: true,
    },
    series: [
      {
        name: nameY1,
        type: "bar",
        stack: "total",
        barWidth: 40,
        data: dataY1,
        itemStyle: {
          color: function (params) {
            return params.dataIndex === maxTotalIndex
              ? highlightColorY1
              : params.dataIndex === minTotalIndex
              ? lowestColorY1
              : colorY1;
          },
        },
      },
      {
        name: nameY2,
        type: "bar",
        stack: "total",
        barWidth: 40,
        data: dataY2,
        itemStyle: {
          color: function (params) {
            return params.dataIndex === maxTotalIndex
              ? highlightColorY2
              : params.dataIndex === minTotalIndex
              ? lowestColorY2
              : colorY2;
          },
        },
        label: {
          show: true,
          position: "top",
          fontSize: 18,
          fontFamily: "Times New Roman",
          color: "#000000",
          formatter: function (params) {
            const total = +dataY1[params.dataIndex] + +dataY2[params.dataIndex]; // Ensure numerical addition by using the unary plus operator
            return total;
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: "425px" }} />
  );
};

export default StackedBarChart;
