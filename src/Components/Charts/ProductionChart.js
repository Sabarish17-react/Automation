import React from "react";
import ReactEcharts from "echarts-for-react";

function ProductionChart(props) {
  return (
    <div className="App">
      <ReactEcharts
        theme="light"
        option={{
          title: {
            left: "center",
            text: props.title,
            textStyle: {
              fontSize: 28,
              fontFamily: "Times New Roman",
            },
          },
          color: [props.customColor],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "8%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: props.xaxis,
              name: props.xaxisname,
              nameGap: 40,
              nameLocation: "middle",
              axisLabel: {
                color: "black",
                fontSize: 20,
                fontFamily: "Times New Roman",
                fontWeight: "normal",
                interval: 0,
              },
              splitNumber: 2,
              nameTextStyle: {
                fontSize: "2.1rem",
                color: "#003366",
                fontFamily: "Times New Roman",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: props.yaxisname,
              nameGap: 45,
              nameLocation: "middle",
              nameTextStyle: {
                fontSize: 25,
                color: "#003366",
                fontFamily: "Times New Roman",
              },
              axisLabel: {
                formatter: props.valueformat,
                color: "black",
                fontSize: 20,
                fontFamily: "Times New Roman",
                fontWeight: "normal",
              },
            },
          ],
          series: [
            {
              name: props.tooltip,
              type: "bar",
              barWidth: props.barwidth,
              showBackground: true,
              data: props.yaxis,
              label: {
                show: true,
                position: "top", // Display the label at the top of each bar
                color: "black", // You can adjust the color as needed
                fontSize: 18, // You can adjust the font size as needed
                fontFamily: "Times New Roman",
                fontWeight: "normal",
              },
            },
          ],
        }}
        style={{ width: "100%", height: Number(props.chartHeight) }}
      />
    </div>
  );
}

export default ProductionChart;
