
var MESSAGE_ID = 1004;
var myCodeMirror;
var SIM_ID = 'SIM-TH';

$(document).ready(function () {

    $(".lmenu").removeClass("active");
    $("#th").addClass("active");
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
            url:  "readfile/th-ui.js",
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
        url: "/writefile/th-ui.js"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,
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
   
   
    // tinc: _.random(content.tincMin,content.tincMax),
    // tinf: _.random(content.tinfMin,content.tinfMax),
    // hum: _.random(content.humMin,content.humMax)

    
    var tincMin, tinfMin,tincMax, tinfMax;
    if($('#tIn').val() == 'c'){ //(0°C × 9/5) + 32 = 32°F
        tincMin = $("#tMin").val();
        tincMax = $("#tMax").val();
        tinfMin = (($("#tMin").val())*9/5)+32;
        tinfMax = (($("#tMax").val())*9/5)+32;

    }else{ //(32°F − 32) × 5/9 = 0°C

        tincMin = ((($("#tMin").val())- 32)*5/9);
        tincMax = ((($("#tMax").val())- 32)*5/9);
        tinfMin = $("#tMin").val();
        tinfMax = $("#tMax").val();
    }
        
    var data ={
        tincMin: tincMin,
        tincMax:tincMax,
        tinfMin:tinfMin,
        tinfMax:tinfMax,
        hMin:$('#hMin').val(),
        hMax:$('#hMax').val(),
        devId : $("#dev-id").val() == "" ? "DEV004": $("#dev-id").val(),
        devModel : $("#dev-model").val() == "" ? "BSKP_TH": $("#dev-model").val(),
        simid :SIM_ID,
        tl : $('#sim').val(),
        mid:MESSAGE_ID,
        domainkey: DOMAIN_KEY, apikey:API_KEY,

    };

    $.ajax({
        url: "/runsimulator/"+SIM_ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ,
        type: 'POST',
        contentType:"application/x-www-form-urlencoded",
        data: {data:data},
        success: function (res) {
            // swal("Success", "simulator Running ", "success");
            $(".status").html(`<div> <span style="color:aquamarine">  `+SIM_ID+` Simulator running...  </span> </div>` );
            // $(".console-area").append(`<div> <span> > `+moment().format("YYYY-MM-DD HH:mm:ss")+` --> </span> <span> `+res.simid+` simulating `+JSON.stringify(res.data)+`  </span> </div>` );
   
            console.log("success: "+JSON.stringify(res));
        },
        error: function (e) {
            console.log("error:",e);
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
            $(".console-area").append(`<div> <span style="color:red"> >` +moment().format("YYYY-MM-DD HH:mm:ss")+` -> `+res+` Simulator stopped...  </span> </div>` );
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
