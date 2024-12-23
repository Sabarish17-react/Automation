import React from "react";
import ReactEcharts from "echarts-for-react";

function BugChart(props) {
  return (
    <div className="App">
      <ReactEcharts
        option={{
          xAxis: {
            type: "value",
            splitNumber: 5,
            nameTextStyle: {
              fontFamily: "Times New Roman",
              fontSize: "2rem",
              color: "#000",
            },
          },
          yAxis: {
            type: "category",
            data: ["By Employee", "By Customer"],
            interval: 10,
            nameTextStyle: {
              fontFamily: "Times New Roman",
              fontSize: "2.5rem",
              color: "#000",
            },
            axisLabel: {
              fontFamily: "Times New Roman",
              fontSize: "1.8rem",
              color: "#000",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          //   dataZoom: {
          //     start: 0,
          //     end: 30,
          //     type: "slider",
          //     orient: "vertical",
          //   },
          series: [
            {
              data: props.xAxis,
              type: "bar",
              barWidth: 22,
              color: "#003366",
            },
          ],
          tooltip: {
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(0,51,102,1.0)",
            axisPointer: {
              type: "line",
            },
            textStyle: {
              color: "rgb(255,255,255)",
              // fontWeight: "bold"
            },
          },
          toolbox: {
            show: true,
            orient: "horizontal",

            feature: {
              saveAsImage: {
                show: true,
                title: "Save image",
                name: "BUG REPORT CHART",
                type: "jpg",
                backgroundColor: "auto",
                // excludeComponents: ["toolbox"],
              },
            },
          },
        }}
        style={{ width: "100%", height: 277 }}
      />
    </div>
  );
}
export default BugChart;
