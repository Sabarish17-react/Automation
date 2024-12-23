import React from "react";
import ReactEcharts from "echarts-for-react";

function BarChart(props) {
  return (
    <div className="App">
      <ReactEcharts
        // key={Date.now()}
        theme="light"
        option={{
          title: {
            left: "center",
            text: props.title,
            textStyle: {
              fontSize: 28,
              fontFamily: "Times New Roman",
            },
            // subtext: 'Fake data'
          },

          color: [props.customColor],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },

          grid: {},
          xAxis: [
            {
              type: "category",
              data: props.xaxis,
              name: props.xaxisname,
              nameGap: 25,
              nameLocation: "middle",
              nameTextStyle: {
                fontSize: 20,
                color: "#003366",
                fontFamily: "Times New Roman",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: props.yaxisname,
              nameGap: 25,
              // nameLocation: 'middle',
              nameTextStyle: {
                fontSize: 20,
              },
              axisLabel: {
                formatter: props.valueformat,
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
            },
          ],
        }}
        style={{ width: "100%", height: Number(props.chartHeight) }}
      />
    </div>
  );
}
export default BarChart;
