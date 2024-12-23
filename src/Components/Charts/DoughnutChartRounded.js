import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";

function DoughutchartRound(props) {
  // console.log(props.chartdata.code);

  return (
    <div className="App">
      <ReactEcharts
        option={{
          title: {
            text: props.title,
            // subtext: 'Fake Data',
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: props.valueformat,
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: false, readOnly: false },
              restore: { show: false },
              saveAsImage: { show: false },
            },
          },

          legend: {
            orient: "vertical",
            left: "20",
            top: "20",

            // Center the legend text vertically
            textStyle: {
              fontSize: 23,
              fontFamily: "Times New Roman",
            },
            // selected: props.selectedLegend, // Pass the selectedLegend state to control legend items
          },

          series: [
            {
              type: "pie",
              radius: [props.innerRadius, props.outterRadius],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                formatter: "{c}",
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: true,
              },
              data: props.chartdata,
            },
          ],
        }}
        onEvents={{
          // Add click event for legend
          legendselectchanged: props.onLegendClick,
        }}
        style={{
          height: Number(props.chartHeight),
          width: "140%",
          justifyContent: "right",
        }}
      />
    </div>
  );
}
export default DoughutchartRound;
