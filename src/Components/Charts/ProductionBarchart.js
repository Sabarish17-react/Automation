import React from "react";
import ReactEcharts from "echarts-for-react";

function ProductionBarchart(props) {
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
            formatter: function (params) {
              let tooltipText = `<div style="font-family: 'Times New Roman'; font-size: 22px; color:#000000 ;display: flex; flex-direction: column;  align-items: center;width:fit-content;height:180px">${params[0].axisValue}<br/> <hr style="width: 80%; border-color: #003366; "/>`;
              params.forEach(function (item) {
                if (item.seriesName === props.nameY) {
                  tooltipText += `<div style="color: #003366; width: 100%; text-align: center; padding-top: 10px;">${
                    props.nameY1
                  }: ${props.dataY1[item.dataIndex]}<br/><br/></div>`;
                  tooltipText += `<div style="color: #003366; width: 100%; text-align: center; padding-top: 10px;">${
                    props.nameY2
                  }: ${props.dataY2[item.dataIndex]}<br/><br/></div>`;
                  tooltipText += `<div style="color: red; width: 100%; text-align: center; padding-top: 10px;">${
                    item.seriesName
                  }: ${props.yaxis[item.dataIndex].toFixed(0)}<br/><br/></div>`;
                }
              });
              tooltipText += "</div>";
              return tooltipText;
            },
          },

          grid: {
            left: "3%",
            right: "2%",
            bottom: "9%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: props.xaxis,
              name: props.xaxisname,
              nameGap: 45,
              nameLocation: "middle",
              nameTextStyle: {
                fontSize: 20,
                color: "#003366",
              },
              axisLabel: {
                fontSize: 20,
                fontFamily: "Times New Roman",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "Percentage",
              nameLocation: "middle",
              nameGap: 50,
              nameTextStyle: {
                fontSize: 20,
                fontFamily: "Times New Roman",
                color: "#003366",
              },
              axisLabel: {
                fontSize: 20,
                fontFamily: "Times New Roman",
              },
            },
          ],

          series: [
            {
              name: props.nameY,
              type: "bar",
              barWidth: props.barwidth,
              showBackground: true,
              data: props.yaxis,
              itemStyle: {
                color: "red",
              },
              label: {
                show: true,
                position: "top",
                formatter: function (params) {
                  return params.value.toFixed(0);
                },
                fontSize: 15,
              },
            },
          ],
        }}
        style={{ width: "100%", height: Number(props.chartHeight) }}
      />
    </div>
  );
}
export default ProductionBarchart;
