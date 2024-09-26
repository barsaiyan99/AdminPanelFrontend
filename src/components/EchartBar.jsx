import React from 'react';
import ReactECharts from "echarts-for-react";

const EchartBar = () => {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: '#fff', // White background for tooltip
            textStyle: { color: '#000' }, // Black text color
            formatter: function (params) {
                let tooltipContent = '';
                params.forEach(param => {
                    tooltipContent += `
                        <div style="display: flex; align-items: center;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${param.color}; margin-right: 5px;"></div>
                            ${param.seriesName}: ${param.value}K
                        </div>
                    `;
                });
                return tooltipContent;
            }
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: true, color: "black" }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: "black",
                show: true,
                formatter: function (value) {
                    return value + 'K';
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: 'Current Clients',
                type: 'bar',
                stack: 'total',
                data: [12, 26, 30, 25, 16, 25, 6, 30, 12, 15, 14, 25],
                itemStyle: {
                    color: '#3A5B22'
                },
                barWidth: '20%',
                barGap: '80%'    
            },
            {
                name: 'Subscribers',
                type: 'bar',
                stack: 'total',
                data: [13, 26, 29, 25, 17, 25, 6, 30, 13, 15, 14, 25],
                itemStyle: {
                    color: '#FFFFFF'
                },
                barWidth: '20%', 
                barGap: '50%'   
            },
            {
                name: 'New Customers',
                type: 'bar',
                stack: 'total',
                data: [13, 26, 30, 27, 17, 26, 6, 31, 13, 15, 14, 24],
                itemStyle: {
                    color: '#FF671F'
                },
                barWidth: '20%', 
                barGap: '50%'    
            }
        ]
    };

    return <ReactECharts option={option} style={{ height: "400px" }} />;
};

export default EchartBar;
