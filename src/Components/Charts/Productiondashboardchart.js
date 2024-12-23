import React from "react";
import ReactEcharts from "echarts-for-react";

const Productiondashboardchart = (props) => {
  const series2Color =
    props.nameY2 === "WO With Short Supply" ? "red" : "#97b3ce";
  return (
    <div>
      <ReactEcharts
        theme="light"
        option={{
          legend: {
            data: [props.nameY1, props.nameY2],
            orient: "horizontal",
            right: 20,
          },
          title: {
            left: "center",
            text: props.title,
            textStyle: {
              fontSize: 28,
              fontFamily: "Times New Roman",
            },
          },
          grid: {
            left: "3%",
            right: "1%",
            bottom: "7%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: props.xaxis,
              name: props.xaxisname,
              nameGap: 35,
              nameLocation: "middle",
              nameTextStyle: {
                fontSize: 20,
                color: "#003366",
              },
              axisLabel: {
                fontSize: 20,
                fontFamily: "Times New Roman",
                interval: 0,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "Nos",
              nameLocation: "middle",
              nameGap: 35,
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

          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: function (params) {
              let tooltipText = `<div style="font-family: 'Times New Roman'; font-size: 22px; color:#000000 ;display: flex; flex-direction: column;  align-items: center;width:fit-content;height:180px">${params[0].axisValue}<br/> <hr style="width: 80%; border-color: #003366; "/>`;
              params.forEach(function (item) {
                if (item.seriesName === props.nameY1) {
                  tooltipText += `<div style="color: #003366; width: 100%; text-align: center; padding-top: 20px;justify-content: space-around;align-items: center">${
                    item.seriesName
                  }: ${props.dataY1[item.dataIndex]}</div>`;
                } else if (item.seriesName === props.nameY2) {
                  tooltipText += `<div style="color: red; width: 100%; text-align: center; padding-top: 20px;justify-content: space-evenly;align-items: center">${
                    item.seriesName
                  }: ${props.dataY2[item.dataIndex]}</div>`;
                }
              });
              tooltipText += "</div>";
              return tooltipText;
            },
          },

          series: [
            {
              name: props.nameY1,
              type: "bar",
              barWidth: props.barwidth,
              itemStyle: {
                color: "#294057",
              },
              data: props.dataY1,
              showBackground: true,
              backgroundStyle: {
                color: "rgba(0,0,0,0.03)",
              },
              label: {
                show: true,
                position: "top",
              },
            },
            {
              name: props.nameY2,
              type: "bar",
              barWidth: props.barwidth,
              itemStyle: {
                color: series2Color, // Set color based on the condition
              },
              data: props.dataY2,
              showBackground: true,
              backgroundStyle: {
                color: "rgba(0,0,0,0.03)",
              },
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        }}
        style={{ width: "100%", height: Number(props.chartHeight) }}
      />
    </div>
  );
};

export default Productiondashboardchart;
