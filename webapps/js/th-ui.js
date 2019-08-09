function uiView() {
    console.log('ui view..---');
    var showDevice = document.getElementById("deviceDetails");
    var deviceDetails = echarts.init(showDevice);
    var deviceApp = {};
    option1 = null; option2 = null;
    deviceApp.title = 'Detection Details';

    var p1v = [120, 132, 101, 134, 90, 230, 210];
    var p1w = [220, 182, 191, 234, 290, 330, 310];
    var p2v = [150, 232, 201, 154, 190, 330, 410];
    var p2w = [320, 332, 301, 334, 390, 330, 320];
    var p3v = [820, 932, 901, 0, 1290, 1330, 1320];
    var p3w = [220, 182, 191, 0, 290, 330, 310];

    var p1vColor = '#0662e8';
    var p1wColor = '#4c87e2';
    var p2vColor = '#3cba84';
    var p2wColor = '#45d698';
    var p3vColor = '#fa9416';
    var p3wColor = '#f9a641';

    option1 = {
        title: {
            text: 'Device Details'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['P1V', 'P1W', 'P2V', 'P2W', 'P3V', 'P3W']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    title: { zoom: 'Zoom', back: 'Reset Zoom' },
                    yAxisIndex: 'none'
                },
                // dataView: {readOnly: false},
                magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
                // magicTitle:{title:['Line Chart','Bar Chart']},
                restore: { title: 'Refresh' },
                saveAsImage: { title: 'Save' }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['V hours ago', '1V hours ago', 'III hours ago', 'II hours ago', 'I hours ago', 'few mins ago', 'just now']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'P1V',
                type: 'line',
                stack: '总量',
                color: p1vColor,
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'P1W',
                type: 'line',
                stack: '总量',
                // color:'#0099CC',
                color: p1wColor,
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'P2V',
                type: 'line',
                stack: '总量',
                color: p2vColor,
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'P2W',
                type: 'line',
                stack: '总量',
                color: p2wColor,
                areaStyle: { normal: {} },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'P3V',
                type: 'line',
                stack: '总量',
                color: p3vColor,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: { normal: {} },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            },
            {
                name: 'P3W',
                type: 'line',
                stack: '总量',
                color: p3wColor,
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };


    var axisData = ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']

    // var data1 = axisData.map(function (item, i) {
    //     return Math.round(Math.random() * 1000 * (i + 1));
    // });


    var linkp1v = p1v.map(function (item, i) { return { source: i, target: i + 1 } });
    var linkp1w = p1w.map(function (item, i) { return { source: i, target: i + 1 } });

    var linkp2v = p2v.map(function (item, i) { return { source: i, target: i + 1 } });
    var linkp2w = p2w.map(function (item, i) { return { source: i, target: i + 1 } });

    var linkp3v = p3v.map(function (item, i) { return { source: i, target: i + 1 } });
    var linkp3w = p3w.map(function (item, i) { return { source: i, target: i + 1 } });

    linkp1v.pop(); linkp1w.pop();
    linkp2v.pop(); linkp2w.pop();
    linkp3v.pop(); linkp3w.pop();

    option2 = {
        title: {
            text: 'Device Detaiils'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        }, toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    title: { zoom: 'Zoom', back: 'Reset Zoom' },
                    yAxisIndex: 'none'
                },
                // dataView: {readOnly: false},
                magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
                // magicTitle:{title:['Line Chart','Bar Chart']},
                restore: { title: 'Refresh' },
                saveAsImage: { title: 'Save' }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: axisData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'P1V',
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                color: p1vColor,
                // label: {
                //     normal: {
                //         show: false
                //     }
                // },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: p1v,
                links: linkp1v,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            },
            {
                name: 'P1W',
                type: 'graph',
                layout: 'none',
                color: p1wColor,
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                // label: {
                //     normal: {
                //         show: true
                //     }
                // },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: p1w,
                links: linkp1w,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            }, {
                name: 'P2V',
                type: 'graph',
                layout: 'none',
                color: p2vColor,
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                // label: {
                //     normal: {
                //         show: false
                //     }
                // },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: p2v,
                links: linkp2v,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            },
            {
                name: 'P2W',
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                color: p2wColor,
                // label: {
                //     normal: {
                //         show: true
                //     }
                // },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: p2w,
                links: linkp2w,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            }, {
                name: 'P3V',
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                color: p3vColor,
                // label: {
                //     normal: {
                //         show: false
                //     }
                // },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: p3v,
                links: linkp3v,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            },
            {
                name: 'P3W',
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                color: p3wColor,
                // label: {
                //     normal: {
                //         show: true
                //     }
                // },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: p3w,
                links: linkp3w,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            }
        ]
        // deviceDetails.setOption(option1, true);
    };





    option3 = {
        title: {
            // text: 'Device Details',
            // subtext: 'data analytics'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['P1V', 'P1W', 'P2V', 'P2W', 'P3V', 'P3W']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    title: { zoom: 'Zoom', back: 'Reset Zoom' },
                    yAxisIndex: 'none'
                },
                // dataView: {readOnly: false},
                magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
                // magicTitle:{title:['Line Chart','Bar Chart']},
                restore: { title: 'Refresh' },
                saveAsImage: { title: 'Save' }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                // formatter: '{value} °C'
                formatter: '{value}'
            }
        },
        series: [
            {
                name: 'P1V',
                type: 'line',
                data: p1v,
                color: p1vColor,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Maximum' },
                        { type: 'min', name: 'Minimum' }
                    ]
                },
                markLine: {
                    data: [
                        // {type: 'average', name: 'Average'}
                    ]
                }
            },
            {
                name: 'P1W',
                type: 'line',
                data: p1w,
                color: p1wColor,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Maximum' },
                        { type: 'min', name: 'Minimum' }
                    ]
                },
                markLine: {
                    data: [
                        // {type: 'average', name: 'Average'}
                    ]
                }
            },
            {
                name: 'P2V',
                type: 'line',
                data: p2v,
                color: p2vColor,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Maximum' },
                        { type: 'min', name: 'Minimum' }
                    ]
                },
                markLine: {
                    data: [
                        // {type: 'average', name: 'Average'}
                    ]
                }
            },
            {
                name: 'P2W',
                type: 'line',
                data: p2w,
                color: p2wColor,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Maximum' },
                        { type: 'min', name: 'Minimum' }
                    ]
                },
                markLine: {
                    data: [
                        // {type: 'average', name: 'Average'}
                    ]
                }
            },
            {
                name: 'P3V',
                type: 'line',
                data: p3v,
                color: p3vColor,
                markPoint: {
                    data: [
                        { type: 'max', title: 'Maximum' },
                        { type: 'min', name: 'Minimum' },
                        { value: 0, name: 'Cutoff' }
                    ]
                },
                markLine: {
                    data: [
                        // {type: 'average', name: 'Average'}
                    ]
                }
            },
            {
                name: 'P3W',
                type: 'line',
                data: p3w,
                color: p3wColor,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Maximum' },
                        { type: 'min', name: 'Minimum' }
                    ]
                },
                markLine: {
                    data: [
                        // {type: 'average', name: 'Average'}
                    ]
                }
            },
          
        ]
    };

    option4 = {
        title: {
            // text: '',
            // subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    title: { zoom: 'Zoom', back: 'Reset Zoom' },
                    yAxisIndex: 'none'
                },
                // dataView: {readOnly: false},
                magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
                // magicTitle:{title:['Line Chart','Bar Chart']},
                restore: { title: 'Refresh' },
                saveAsImage: { title: 'Save' }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} '
            },
            axisPointer: {
                snap: true
            }
        },
      
        series: [
            {
                name: 'P1V',
                type: 'line',
                smooth: true,
                data: p1v,
                color: p1vColor,
                markArea: {
                    data: [[{
                        name: 'Specified Region',
                        xAxis: '4 hours ago'
                    }, {
                        xAxis: '3 hours ago'
                    }],
                        // [{
                        //     name: '晚高峰',
                        //     xAxis: '17:30'
                        // }, {
                        //     xAxis: '21:15'
                        // }] 
                    ]
                }
            },
            {
                name: 'P1W',
                type: 'line',
                smooth: true,
                data: p1w,
                color: p1wColor
                // markArea: {
                //     data: [ [{
                //         name: '早高峰',
                //         xAxis: '07:30'
                //     }, {
                //         xAxis: '10:00'
                //     }], [{
                //         name: '晚高峰',
                //         xAxis: '17:30'
                //     }, {
                //         xAxis: '21:15'
                //     }] ]
                // }
            },
            {
                name: 'P2V',
                type: 'line',
                smooth: true,
                data: p2v,
                color: p2vColor,
               
            },
            {
                name: 'P2W',
                type: 'line',
                smooth: true,
                data: p2w,
                color: p2wColor,
               
            },
            {
                name: 'P3V',
                type: 'line',
                smooth: true,
                data: p3v,
                color: p3vColor,
                markArea: {
                    data: [[{
                        name: 'Specified Region',
                        xAxis: '2 hours ago'
                    }, {
                        xAxis: '1 hours ago'
                    }],
               
                    ]
                }
            },
            {
                name: 'P3W',
                type: 'line',
                smooth: true,
                data: p3w,
                color: p3wColor
               
            }
        ]
    };

    if ($('#views').val() == 'view1') {
        deviceDetails.setOption(option1, true);
    } else if ($('#views').val() == 'view2') {
        deviceDetails.setOption(option2, true);
    } else if ($('#views').val() == 'view3') {
        deviceDetails.setOption(option3, true);
    } else if ($('#views').val() == 'view4') {
        deviceDetails.setOption(option4, true);
    }

    

}