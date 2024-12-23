import React from "react";
import ReactEcharts from "echarts-for-react";

function DoughutchartRoundIot(props) {
  return (
    <div className="App">
      <ReactEcharts
        option={{
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
            top: "bottom",
            textStyle: {
              fontSize: 18,
              fontFamily: "Times New Roman",
            },
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
                formatter: props.formatter,
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
        style={{ height: Number(props.chartHeight), width: "100%" }}
      />
    </div>
  );
}
export default DoughutchartRoundIot;
