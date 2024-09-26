import React from 'react'
import ReactECharts from "echarts-for-react"

const EchartRadial = () => {
    const option = {
        
        polar: {
          radius: [100, '45%']
        },
        angleAxis: {
          max: 10,
          startAngle: 180,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false }
        },
        radiusAxis: {
          type: 'category',
          data: ['Organic', 'Social', 'Direct'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false }
        },
        tooltip: {},
        series: [
          {
            type: 'bar',
            data: [8, 6, 5],
            coordinateSystem: 'polar',
            barWidth: 6, 
            barGap: '-100%', 
            label: {
              show: false,
              position: 'middle',
              formatter: '{b}: {c}'
            },
            itemStyle: {
              color: function(params) {
                const colors = [    '#FF671F','#FFFFFF', '#3A5B22'];
                return colors[params.dataIndex];
              }
            }
          }
        ],
        graphic: [
          {
            type: 'text',
            top:'45%',
            left:'40%',
            style: {
              text: '150k', 
              textAlign: 'center',
              fill: '#000',
              fontSize: 28
            },
            z: 100,
         
          }
        ]
      };
      
      return <ReactECharts option={option} className="w-full h-full" />;
}

export default EchartRadial
