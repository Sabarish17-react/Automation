import React from "react";
import ReactEcharts from "echarts-for-react";

function NightingaleChart(props) {
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
          legend: {
            top: "bottom",
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
          series: [
            {
              name: "Nightingale Chart",
              type: "pie",
              radius: [props.innerRadius, props.outterRadius],
              //center: ['50%', '50%'],
              roseType: props.mode, //area,radius
              itemStyle: {
                borderRadius: Number(props.borderRadius),
              },
              data: props.chartdata,
            },
          ],
        }}
        style={{ height: Number(props.chartHeight), width: "90%" }}
      />
    </div>
  );
}
export default NightingaleChart;
