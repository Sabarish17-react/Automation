import React from "react";
import ReactECharts from "echarts-for-react";

function PieChart(props) {

    const pieOptions = {
        title: {
          text: props.title,
          subtext: props.subTitle,
          left: 'center',
          textStyle: {
            color: "rgb(0,51,102)",
            fontSize: "2rem"
          },
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'bottom'
        },
        series: [
          {
            name: props.seriesName,
            type: 'pie',
            radius: '65%',
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 64, 255, 0.7)'
              }
            }
          }
        ],
        tooltip: {
            show: true,
            trigger: 'item',
            backgroundColor: "rgba(0,26,102,1.0)",
            textStyle: {
                color: "rgb(255,255,255)",
                fontWeight: "bold"
            },
            formatter: '{a} <br/><hr/>{b} : {c} ({d}%)'
        },
    };

    return(
        <div>
            <ReactECharts option={pieOptions} style={{height: props.height}}/>
        </div>
    )
}

export default PieChart;