import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";

function DoughutchartRoundmonth(props) {
  console.log(props.valueformat);

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

            textStyle: {
              fontSize: 23,
              fontFamily: "Times New Roman",
              lineHeight: "20",
            },
            itemGap: 35,
            selectorLabel: {
              fontWeight: "bold",
              color: "blue",
            },
            // tooltip: {
            //   show: "true",
            //   formatter: props.valueformat,
            // },
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
                formatter: "{b} : {c} L",
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 22,
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
          legendselectchanged: props.onLegendClick, // Add legend click event
          click: (event) => {
            // Pass the click event to props.onLegend
            props.onLegendClick(event);
          },
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
export default DoughutchartRoundmonth;
