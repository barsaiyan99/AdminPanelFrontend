import React from 'react';
import ReactECharts from "echarts-for-react";

const EchartMeter = () => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '60%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.5, '#FF671F'],
              [0.75, '#fff'],
              [1.90, '#046A38'],
             
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 10,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false, 
        },
        axisLabel: {
          show: false, 
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-40%'], 
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '%'; 
          },
          color: '#000' 
        },
        title: {
          offsetCenter: [0, '30%'], 
          fontSize: 14,
          color: '#000',
          text: 'Transactions below it' 
        },
        data: [
          {
            value: 0.8,
          }
        ]
      }
    ]
  };

  return <ReactECharts option={option} className="w-full h-full" />;
}

export default EchartMeter;
