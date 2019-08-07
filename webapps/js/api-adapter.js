var TIME_OUT;
var TIME_LIMIT = 0;

$(document).ajaxError(function myErrorHandler(event, xhr, ajaxOptions, thrownError) {


    if (xhr.status === 417 && xhr.responseJSON.code === 'INVALID_AUTH_TOKEN') {
        Cookies.remove('session_obj');
        document.location = '/login';
    }
    // console.log(API_BASE_PATH);
});


//Auth Calls

//platform 3.0
// function loginCall(email, password, cbk) {
//     var data = {
//         userId : email,
//         password: password
//     }
//     $.ajax({
//         url: API_BASE_PATH + "/system/login",
//         data: JSON.stringify(data),
//         contentType: "application/json",
//         type: 'POST',
//         success: function (data) {
//             //called when successful
//             cbk(true, data);
//         },
//         error: function (e) {
//             //called when there is an error
//             //console.log(e.message);
//             cbk(false, null);
//         }
//     });

// }


// function loginOutCall(cbk) {
//     $.ajax({
//         url: API_BASE_PATH + "/system/logout?atoken=" + API_TOKEN,
//         type: 'GET',
//         success: function (data) {
//             cbk(true);
//         },
//         error: function (e) {
//             cbk(false);
//         }
//     });

// }


////platform 2.0
function loginCall(email, password, cbk) {
    var str = DOMAIN_KEY ? '?targetDomainKey=' + DOMAIN_KEY : '';
    $.ajax({
        url: API_BASE_PATH + "/domain/login/" + email + "/" + password + str,
        type: 'GET',
        success: function (data) {
            cbk(true, data);
        },
        error: function (e) {
            cbk(false, null);
        }
    });

}

function loginOutCall(cbk) {
    $.ajax({
        url: API_BASE_PATH + "/domain/logout/" + API_TOKEN,
        type: 'GET',
        success: function (data) {
            cbk(true);
        },
        error: function (e) {
            cbk(false);
        }
    });

}

function simulateDeviceMessage(mid,id,model, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/push/raw/" + DOMAIN_KEY + "/" + API_KEY + "/SIMULATOR_" + id + "/"+model+"/1.0/" + mid + '?type=JSON',
        data: JSON.stringify(data),
        contentType: "text/plain",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//Property Calls

function getUserProperty(name, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/user/property/get/" + API_TOKEN + "/" + USER_OBJ.email + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

// simulate Message
// platform 3.0

// function simulateDeviceMessage(id, data, cbk) {


//     $.ajax({
//         url: API_BASE_PATH + "/push/raw/" + DOMAIN_KEY + "/" + API_KEY + "/SIMULATOR_" + id + "/BOODSKAP/1.0/" + id + '?type=JSON',
//         data: JSON.stringify(data),
//         contentType: "text/plain",
//         type: 'POST',
//         success: function (data) {
//             //called when successful
//             cbk(true, data);
//         },
//         error: function (e) {
//             //called when there is an error
//             //console.log(e.message);
//             cbk(false, e);
//         }
//     });
// }


// platform 2.0

var TYPE, MID,ID,MODEL,DATA,CBK;
// function simulateDeviceMessage(tl,type,mid,id,model, data, cbk) {

//     TIME_LIMIT = tl;
//     TYPE = type;  MID = mid; ID=id; MODEL = model; DATA=data; CBK = cbk;

//     // console.log(this.tl,tl,this.type, type,this.mid, mid, this.model , model, this.data , data, this.cbk , cbk);

//     // /push/raw/{dkey}/{akey}/{did}/{dmdl}/{fwver}/{mid}  Push Raw Message
//     // $.ajax({
//     //     url: API_BASE_PATH + "/push/raw/" + DOMAIN_KEY + "/" + API_KEY + "/SIMULATOR_" + id + "/"+model+"/1.0.0/" +mid+ '?type=JSON',
//     //     data: JSON.stringify(data),
//     //     contentType: "text/plain"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ,
//     //     type: 'POST',
//     //     success: function (data) {
//     //         //called when successful
//     //         cbk(true, data);
//     //     },
//     //     error: function (e) {
//     //         //called when there is an error
//     //         //console.log(e.message);
//     //         cbk(false, e);
//     //     }
//     // });
//     // console.log(type);


//     if(TIME_LIMIT>0){
//         // this.tl = tl; this.type = type; this.mid = mid; this.id = id; this.model = model; this.data = data; this.cbk = cbk
//         test =  setTimeout(simulateDeviceMessage(TYPE,MID,ID,MODEL,DATA,CBK),tl);
//     }
// }

var test;var t = 15000;
function simulateDeviceMessage(){
    console.log("testing.....");
   
    if(t > 0){
       
        test = setTimeout(simulateDeviceMessage,t);
    }
}

function stopSimulator(type) {
    // TIME_LIMIT = 0;
    // console.log(TIME_LIMIT);
    
    clearTimeout(type);

    $(".console-area").append(type+' simulator stoped...');

    $('#stopSim-'+type).attr("disabled","disabled");
    $('#run-'+type).removeAttr('disabled');
}

// function simulateDeviceMessage(mid,id,model, data, cbk) {

//     // /push/raw/{dkey}/{akey}/{did}/{dmdl}/{fwver}/{mid}  Push Raw Message
//     $.ajax({
//         url: API_BASE_PATH + "/push/raw/" + DOMAIN_KEY + "/" + API_KEY + "/SIMULATOR_" + id + "/"+model+"/1.0.0/" +mid+ '?type=JSON',
//         data: JSON.stringify(data),
//         contentType: "text/plain"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ,
//         type: 'POST',
//         success: function (data) {
//             //called when successful
//             cbk(true, data);
//         },
//         error: function (e) {
//             //called when there is an error
//             //console.log(e.message);
//             cbk(false, e);
//         }
//     });
// }
