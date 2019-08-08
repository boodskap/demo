
var MESSAGE_ID = 1001;
var myCodeMirror;
var SIM_ID = 'SIM-PMS';

$(document).ready(function () {

    $(".lmenu").removeClass("active");
    $("#pms").addClass("active");
    uiView();
    codeView();
   
});

  // code mirror ...
function codeView(r){
    // console.log(r);
   
    // console.log('code view...');
    $(".file-tree").filetree({
        animationSpeed: 'slow'
    });
    //console.log(CodeMirror.modes);
    if(r=='js'){
        //  var myEditor = $('#editor').val();
        $("#editor").empty();
        var myTextarea = document.getElementById("editor");
          
        $.ajax({
            url:  "readfile/pms-ui.js",
            type: 'GET',
            success: function (data) {
            //    console.log(data);

               myCodeMirror = CodeMirror(myTextarea, {
                    //fromTextArea: document.getElementById('pmsTab') ,
                    value: data,
                    //mode:  "application/x-ejs",
                    mode: "text/javascript",
                    styleActiveLine: true,
                    lineNumbers: true,
                    //  theme: "ambiance",
                    lineWrapping: true,
                    indentUnit: 4,
                    indentWithTabs: true
    
                });
               
            },
            error: function (e) {
                console.log(e);
            }
        });


        
        // myTextarea = "";
       
    }else if(r == 'html'){

    } 
}

function savetoServer() {

    $.ajax({
        url: "/writefile/pms-ui.js"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,
        type: 'POST',
        dataType:"script",
        contentType:"application/x-www-form-urlencoded",
        data: {data:myCodeMirror.getValue()},
        success: function (data) {
            swal("Success", "File saved successfully", "success");
            // console.log("success: "+data);
            
        },
        error: function (e) {
            // console.log(e);
            swal("Error", e, "danger");
        }
    });

}



function simView(){
    // console.log($(".col-sim").height());
    setTimeout(function() {
        $(".col-run").height($(".col-sim").height());

    },500);
    // console.log($(".col-run").height()); 
}

function startSimulator() {

    $('#runSim').addClass("disabled");
    $('#runSim').attr('disabled',true);

    $('#runSim').html('<span>Running...<i class="fa fa-spinner fa-spin"></i></span>');

    var data ={
        p1vMin: parseInt($('#p1vMin').val()),p1vMax: parseInt($('#p1vMax').val()),
        p2vMin: parseInt($('#p2vMin').val()),p2vMax: parseInt($('#p2vMax').val()),
        p3vMin: parseInt($('#p3vMin').val()),p3vMax: parseInt($('#p3vMax').val()),

        p1wMin: parseInt($('#p1wMin').val()),p1wMax:parseInt($('#p1wMax').val()),
        p2wMin: parseInt($('#p2wMin').val()),p2wMax:parseInt($('#p2wMax').val()),
        p3wMin: parseInt($('#p3wMin').val()),p3wMax:parseInt($('#p3wMax').val()),
        devId : $("#dev-id").val() == "" ? "DEV001": $("#dev-id").val(),
        devModel : $("#dev-model").val() == "" ? "BSKP_PMS": $("#dev-model").val(),
        simid :SIM_ID,
        tl : $('#sim').val(),
        mid:MESSAGE_ID,
        domainkey: DOMAIN_KEY, apikey:API_KEY,

    };

    $.ajax({
        url: "/runsimulator/"+SIM_ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,
        type: 'POST',
        contentType:"application/x-www-form-urlencoded",
        data: {data:data},
        success: function (res) {
            // swal("Success", "simulator Running ", "success");
                      
            console.log("simulator started");
         
            $(".status").html(`<div> <span style="color:aquamarine">  `+SIM_ID+` Simulator running...  </span> </div>` );
            // $(".console-area").append(`<div> <span> > `+moment().format("YYYY-MM-DD HH:mm:ss")+` --> </span> <span> `+res.simid+` simulating `+JSON.stringify(res.data)+`  </span> </div>` );
            
            
           
            console.log("success: "+JSON.stringify(res));
        },
        error: function (e) {
            console.log("simulator error:",e);
            $('#runSim').removeAttr("disabled");
            $('#runSim').attr('disabled',false);
            $(".status").html(`<div> <span style="color:red"> error occurs... `+ JSON.stringify(e)+`</span> </div>` );
            $('#runSim').html('<i class="fa fa-spinner fa-spin"></i><span> Running...</span>');

            // swal("Error", e, "danger");
        }
    });
    if($('#sim').val() == 0){
        console.log('one time simulation');
        $(".status").html( `<div> <span style="color:aquamarine"> `+SIM_ID+` one time simulation  </span> </div>` );

        $('#runSim').removeClass("disabled");
        $('#runSim').attr('disabled',false);

        $('#runSim').html('<span> Run </span>');

    }
    
}

function clearConsole() {
    $(".console-area").html('');
}

function stopSimulator() {

    $(".status").html('<span style="color:red"> '+SIM_ID+' Simulator stoped...</span>');

    $('#stopSim').addClass('disabled');
    $('#stopSim').attr("disabled",true);

    $("#stopSim").html("Stopping...");
  //  $('#stopSim').attr("disabled","disabled");
   // $('#runSim').removeAttr('disabled');

    $.ajax({
        url: "/stopsimulator/"+SIM_ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,
        type: 'POST',
        //data: {data:SIM_UID},
        contentType:"application/x-www-form-urlencoded",
      
        success: function (res) {
            // swal("Success", "simulator Running ", "success");
             console.log("success: "+res);

             if(res == 'error'){
                $(".status").html(` <span style="color:red">  `+SIM_ID+` Simulator stopping error... Try again...  </span> ` );
                $(".console-area").append(`<div> <span style="color:red"> > ` +moment().format("YYYY-MM-DD HH:mm:ss")+ ` -> `+SIM_ID+` Simulator stopping error... Try again...  </span> </div>` ); 
                $('#stopSim').html('Stop');
                return;
             }
                       
            $('#runSim').removeClass('disabled');
            $('#runSim').attr('disabled',false);

            $('#runSim').html('Run');

            $(".status").html(`<div> <span style="color:red"> `+res+` Simulator stopped...  </span> </div>` );
            $(".console-area").append(`<div> <span style="color:red"> > ` +moment().format("YYYY-MM-DD HH:mm:ss")+` -> `+res+` Simulator stopped...  </span> </div>` );
            $("#stopSim").html("Stop");

          //  $(".console-area").append(`<div> <span> > `+moment().format("YYYY-MM-DD HH:mm:ss")+` --> </span> <span> `+res.simid+` simulating `+res.data+`  </span> </div>` );

        },
        error: function (e) {
            console.log("error:",e);
            $('#stopSim').removeAttr('disabled');
            $('#stopSim').attr('disabled',false);
            
            $('#runSim').addClass('disabled');
            $('#runSim').attr("disabled",true);
            
            $("#stopSim").html("Stop");

            $(".status").html(`<div> <span style="color:red">  Simulator error `+e+`  </span> </div>` );
            // swal("Error", e, "danger");
        }
    });
}


// function uiView() {
//     console.log('ui view...');
//     var showDevice = document.getElementById("deviceDetails");
//     var deviceDetails = echarts.init(showDevice);
//     var deviceApp = {};
//     option1 = null; option2 = null;
//     deviceApp.title = 'Detection Details';

//     var p1v = [120, 132, 101, 134, 90, 230, 210];
//     var p1w = [220, 182, 191, 234, 290, 330, 310];
//     var p2v = [150, 232, 201, 154, 190, 330, 410];
//     var p2w = [320, 332, 301, 334, 390, 330, 320];
//     var p3v = [820, 932, 901, 0, 1290, 1330, 1320];
//     var p3w = [220, 182, 191, 0, 290, 330, 310];

//     var p1vColor = '#0662e8';
//     var p1wColor = '#4c87e2';
//     var p2vColor = '#3cba84';
//     var p2wColor = '#45d698';
//     var p3vColor = '#fa9416';
//     var p3wColor = '#f9a641';

//     option1 = {
//         title: {
//             text: 'Device Details'
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'cross',
//                 label: {
//                     backgroundColor: '#6a7985'
//                 }
//             }
//         },
//         legend: {
//             data: ['P1V', 'P1W', 'P2V', 'P2W', 'P3V', 'P3W']
//         },
//         toolbox: {
//             show: true,
//             feature: {
//                 dataZoom: {
//                     title: { zoom: 'Zoom', back: 'Reset Zoom' },
//                     yAxisIndex: 'none'
//                 },
//                 // dataView: {readOnly: false},
//                 magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
//                 // magicTitle:{title:['Line Chart','Bar Chart']},
//                 restore: { title: 'Refresh' },
//                 saveAsImage: { title: 'Save' }
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis: [
//             {
//                 type: 'category',
//                 boundaryGap: false,
//                 data: ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']
//             }
//         ],
//         yAxis: [
//             {
//                 type: 'value'
//             }
//         ],
//         series: [
//             {
//                 name: 'P1V',
//                 type: 'line',
//                 stack: '总量',
//                 color: p1vColor,
//                 areaStyle: {},
//                 data: [120, 132, 101, 134, 90, 230, 210]
//             },
//             {
//                 name: 'P1W',
//                 type: 'line',
//                 stack: '总量',
//                 // color:'#0099CC',
//                 color: p1wColor,
//                 areaStyle: {},
//                 data: [220, 182, 191, 234, 290, 330, 310]
//             },
//             {
//                 name: 'P2V',
//                 type: 'line',
//                 stack: '总量',
//                 color: p2vColor,
//                 areaStyle: {},
//                 data: [150, 232, 201, 154, 190, 330, 410]
//             },
//             {
//                 name: 'P2W',
//                 type: 'line',
//                 stack: '总量',
//                 color: p2wColor,
//                 areaStyle: { normal: {} },
//                 data: [320, 332, 301, 334, 390, 330, 320]
//             },
//             {
//                 name: 'P3V',
//                 type: 'line',
//                 stack: '总量',
//                 color: p3vColor,
//                 label: {
//                     normal: {
//                         show: true,
//                         position: 'top'
//                     }
//                 },
//                 areaStyle: { normal: {} },
//                 data: [820, 932, 901, 934, 1290, 1330, 1320]
//             },
//             {
//                 name: 'P3W',
//                 type: 'line',
//                 stack: '总量',
//                 color: p3wColor,
//                 areaStyle: {},
//                 data: [220, 182, 191, 234, 290, 330, 310]
//             }
//         ]
//     };


//     var axisData = ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']

//     // var data1 = axisData.map(function (item, i) {
//     //     return Math.round(Math.random() * 1000 * (i + 1));
//     // });


//     var linkp1v = p1v.map(function (item, i) { return { source: i, target: i + 1 } });
//     var linkp1w = p1w.map(function (item, i) { return { source: i, target: i + 1 } });

//     var linkp2v = p2v.map(function (item, i) { return { source: i, target: i + 1 } });
//     var linkp2w = p2w.map(function (item, i) { return { source: i, target: i + 1 } });

//     var linkp3v = p3v.map(function (item, i) { return { source: i, target: i + 1 } });
//     var linkp3w = p3w.map(function (item, i) { return { source: i, target: i + 1 } });

//     linkp1v.pop(); linkp1w.pop();
//     linkp2v.pop(); linkp2w.pop();
//     linkp3v.pop(); linkp3w.pop();

//     option2 = {
//         title: {
//             text: 'Device Detaiils'
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'cross',
//                 label: {
//                     backgroundColor: '#6a7985'
//                 }
//             }
//         }, toolbox: {
//             show: true,
//             feature: {
//                 dataZoom: {
//                     title: { zoom: 'Zoom', back: 'Reset Zoom' },
//                     yAxisIndex: 'none'
//                 },
//                 // dataView: {readOnly: false},
//                 magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
//                 // magicTitle:{title:['Line Chart','Bar Chart']},
//                 restore: { title: 'Refresh' },
//                 saveAsImage: { title: 'Save' }
//             }
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false,
//             data: axisData
//         },
//         yAxis: {
//             type: 'value'
//         },
//         series: [
//             {
//                 name: 'P1V',
//                 type: 'graph',
//                 layout: 'none',
//                 coordinateSystem: 'cartesian2d',
//                 symbolSize: 30,
//                 color: p1vColor,
//                 // label: {
//                 //     normal: {
//                 //         show: false
//                 //     }
//                 // },
//                 edgeSymbol: ['circle', 'arrow'],
//                 edgeSymbolSize: [4, 10],
//                 data: p1v,
//                 links: linkp1v,
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 }
//             },
//             {
//                 name: 'P1W',
//                 type: 'graph',
//                 layout: 'none',
//                 color: p1wColor,
//                 coordinateSystem: 'cartesian2d',
//                 symbolSize: 30,
//                 // label: {
//                 //     normal: {
//                 //         show: true
//                 //     }
//                 // },
//                 edgeSymbol: ['circle', 'arrow'],
//                 edgeSymbolSize: [4, 10],
//                 data: p1w,
//                 links: linkp1w,
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 }
//             }, {
//                 name: 'P2V',
//                 type: 'graph',
//                 layout: 'none',
//                 color: p2vColor,
//                 coordinateSystem: 'cartesian2d',
//                 symbolSize: 30,
//                 // label: {
//                 //     normal: {
//                 //         show: false
//                 //     }
//                 // },
//                 edgeSymbol: ['circle', 'arrow'],
//                 edgeSymbolSize: [4, 10],
//                 data: p2v,
//                 links: linkp2v,
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 }
//             },
//             {
//                 name: 'P2W',
//                 type: 'graph',
//                 layout: 'none',
//                 coordinateSystem: 'cartesian2d',
//                 symbolSize: 30,
//                 color: p2wColor,
//                 // label: {
//                 //     normal: {
//                 //         show: true
//                 //     }
//                 // },
//                 edgeSymbol: ['circle', 'arrow'],
//                 edgeSymbolSize: [4, 10],
//                 data: p2w,
//                 links: linkp2w,
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 }
//             }, {
//                 name: 'P3V',
//                 type: 'graph',
//                 layout: 'none',
//                 coordinateSystem: 'cartesian2d',
//                 symbolSize: 30,
//                 color: p3vColor,
//                 // label: {
//                 //     normal: {
//                 //         show: false
//                 //     }
//                 // },
//                 edgeSymbol: ['circle', 'arrow'],
//                 edgeSymbolSize: [4, 10],
//                 data: p3v,
//                 links: linkp3v,
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 }
//             },
//             {
//                 name: 'P3W',
//                 type: 'graph',
//                 layout: 'none',
//                 coordinateSystem: 'cartesian2d',
//                 symbolSize: 30,
//                 color: p3wColor,
//                 // label: {
//                 //     normal: {
//                 //         show: true
//                 //     }
//                 // },
//                 edgeSymbol: ['circle', 'arrow'],
//                 edgeSymbolSize: [4, 10],
//                 data: p3w,
//                 links: linkp3w,
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 }
//             }
//         ]
//         // deviceDetails.setOption(option1, true);
//     };





//     option3 = {
//         title: {
//             // text: 'Device Details',
//             // subtext: 'data analytics'
//         },
//         tooltip: {
//             trigger: 'axis'
//         },
//         legend: {
//             data: ['P1V', 'P1W', 'P2V', 'P2W', 'P3V', 'P3W']
//         },
//         toolbox: {
//             show: true,
//             feature: {
//                 dataZoom: {
//                     title: { zoom: 'Zoom', back: 'Reset Zoom' },
//                     yAxisIndex: 'none'
//                 },
//                 // dataView: {readOnly: false},
//                 magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
//                 // magicTitle:{title:['Line Chart','Bar Chart']},
//                 restore: { title: 'Refresh' },
//                 saveAsImage: { title: 'Save' }
//             }
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false,
//             data: ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']
//         },
//         yAxis: {
//             type: 'value',
//             axisLabel: {
//                 // formatter: '{value} °C'
//                 formatter: '{value}'
//             }
//         },
//         series: [
//             {
//                 name: 'P1V',
//                 type: 'line',
//                 data: p1v,
//                 color: p1vColor,
//                 markPoint: {
//                     data: [
//                         { type: 'max', name: 'Maximum' },
//                         { type: 'min', name: 'Minimum' }
//                     ]
//                 },
//                 markLine: {
//                     data: [
//                         // {type: 'average', name: 'Average'}
//                     ]
//                 }
//             },
//             {
//                 name: 'P1W',
//                 type: 'line',
//                 data: p1w,
//                 color: p1wColor,
//                 markPoint: {
//                     data: [
//                         { type: 'max', name: 'Maximum' },
//                         { type: 'min', name: 'Minimum' }
//                     ]
//                 },
//                 markLine: {
//                     data: [
//                         // {type: 'average', name: 'Average'}
//                     ]
//                 }
//             },
//             {
//                 name: 'P2V',
//                 type: 'line',
//                 data: p2v,
//                 color: p2vColor,
//                 markPoint: {
//                     data: [
//                         { type: 'max', name: 'Maximum' },
//                         { type: 'min', name: 'Minimum' }
//                     ]
//                 },
//                 markLine: {
//                     data: [
//                         // {type: 'average', name: 'Average'}
//                     ]
//                 }
//             },
//             {
//                 name: 'P2W',
//                 type: 'line',
//                 data: p2w,
//                 color: p2wColor,
//                 markPoint: {
//                     data: [
//                         { type: 'max', name: 'Maximum' },
//                         { type: 'min', name: 'Minimum' }
//                     ]
//                 },
//                 markLine: {
//                     data: [
//                         // {type: 'average', name: 'Average'}
//                     ]
//                 }
//             },
//             {
//                 name: 'P3V',
//                 type: 'line',
//                 data: p3v,
//                 color: p3vColor,
//                 markPoint: {
//                     data: [
//                         { type: 'max', title: 'Maximum' },
//                         { type: 'min', name: 'Minimum' },
//                         { value: 0, name: 'Cutoff' }
//                     ]
//                 },
//                 markLine: {
//                     data: [
//                         // {type: 'average', name: 'Average'}
//                     ]
//                 }
//             },
//             {
//                 name: 'P3W',
//                 type: 'line',
//                 data: p3w,
//                 color: p3wColor,
//                 markPoint: {
//                     data: [
//                         { type: 'max', name: 'Maximum' },
//                         { type: 'min', name: 'Minimum' }
//                     ]
//                 },
//                 markLine: {
//                     data: [
//                         // {type: 'average', name: 'Average'}
//                     ]
//                 }
//             },
          
//         ]
//     };

//     option4 = {
//         title: {
//             // text: '',
//             // subtext: ''
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'cross'
//             }
//         },
//         toolbox: {
//             show: true,
//             feature: {
//                 dataZoom: {
//                     title: { zoom: 'Zoom', back: 'Reset Zoom' },
//                     yAxisIndex: 'none'
//                 },
//                 // dataView: {readOnly: false},
//                 magicType: { type: ['line', 'bar', 'stack', 'tiled', 'pie'], title: { line: 'Line Chart', bar: 'Bar Chart', stack: 'Stacked Chart', tiled: 'Tiled Chart' } },
//                 // magicTitle:{title:['Line Chart','Bar Chart']},
//                 restore: { title: 'Refresh' },
//                 saveAsImage: { title: 'Save' }
//             }
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false,
//             data: ['5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hours ago', 'few mins ago', 'just now']
//         },
//         yAxis: {
//             type: 'value',
//             axisLabel: {
//                 formatter: '{value} '
//             },
//             axisPointer: {
//                 snap: true
//             }
//         },
      
//         series: [
//             {
//                 name: 'P1V',
//                 type: 'line',
//                 smooth: true,
//                 data: p1v,
//                 color: p1vColor,
//                 markArea: {
//                     data: [[{
//                         name: 'Specified Region',
//                         xAxis: '4 hours ago'
//                     }, {
//                         xAxis: '3 hours ago'
//                     }],
//                         // [{
//                         //     name: '晚高峰',
//                         //     xAxis: '17:30'
//                         // }, {
//                         //     xAxis: '21:15'
//                         // }] 
//                     ]
//                 }
//             },
//             {
//                 name: 'P1W',
//                 type: 'line',
//                 smooth: true,
//                 data: p1w,
//                 color: p1wColor
//                 // markArea: {
//                 //     data: [ [{
//                 //         name: '早高峰',
//                 //         xAxis: '07:30'
//                 //     }, {
//                 //         xAxis: '10:00'
//                 //     }], [{
//                 //         name: '晚高峰',
//                 //         xAxis: '17:30'
//                 //     }, {
//                 //         xAxis: '21:15'
//                 //     }] ]
//                 // }
//             },
//             {
//                 name: 'P2V',
//                 type: 'line',
//                 smooth: true,
//                 data: p2v,
//                 color: p2vColor,
               
//             },
//             {
//                 name: 'P2W',
//                 type: 'line',
//                 smooth: true,
//                 data: p2w,
//                 color: p2wColor,
               
//             },
//             {
//                 name: 'P3V',
//                 type: 'line',
//                 smooth: true,
//                 data: p3v,
//                 color: p3vColor,
//                 markArea: {
//                     data: [[{
//                         name: 'Specified Region',
//                         xAxis: '2 hours ago'
//                     }, {
//                         xAxis: '1 hours ago'
//                     }],
               
//                     ]
//                 }
//             },
//             {
//                 name: 'P3W',
//                 type: 'line',
//                 smooth: true,
//                 data: p3w,
//                 color: p3wColor
               
//             }
//         ]
//     };

//     if ($('#views').val() == 'view1') {
//         deviceDetails.setOption(option1, true);
//     } else if ($('#views').val() == 'view2') {
//         deviceDetails.setOption(option2, true);
//     } else if ($('#views').val() == 'view3') {
//         deviceDetails.setOption(option3, true);
//     } else if ($('#views').val() == 'view4') {
//         deviceDetails.setOption(option4, true);
//     }

// }