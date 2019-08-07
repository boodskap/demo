/*******************************
 * Import Required Modules
 ****************************/
var express = require('express');
var bodyParser = require('body-parser');
var layout = require('express-layout');
var path = require("path");
var fs = require('fs');
var request = require("request");
var _ = require('underscore');
var CircularJSON = require('circular-json');
var safeJsonStringify = require('safe-json-stringify');

var stringify = require('json-stringify-safe');



var PMS_UID;
var RMS_UID;


var app = express();
var cookieParser = require('cookie-parser')
var session = require('cookie-session');
var compression = require('compression')

// app.use('fs', fs);
/*******************************
 * Require Configuration
 ****************************/
var conf = require("./config");
// fs.open('myfile', 'r', (err, fd) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         console.error('myfile does not exist');
//         return;
//       }
  
//       throw err;
//     }
  
//     readMyData(fd);
//   });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// compress all responses
app.use(compression())

//For Static Files
app.set('views', path.join(__dirname, 'views'));

var options = {
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
        res.set('vary', 'Accept-Encoding');
        res.set('x-timestamp', Date.now());
    }
};

var controllerOptions = {
    maxAge: 0,
    setHeaders: function (res, path, stat) {
        res.set('vary', 'Accept-Encoding');
        res.set('x-timestamp', Date.now());
    }
};
var test = function(){
    console.log('server function testing...');
}


app.use('/css', express.static(__dirname + '/webapps/css', options));
app.use('/images', express.static(__dirname + '/webapps/images', options));
app.use('/libraries', express.static(__dirname + '/webapps/libraries', options));
app.use('/webfonts', express.static(__dirname + '/webapps/webfonts', options));

app.use('/js', express.static(__dirname + '/webapps/js', controllerOptions));
app.use(express.static(__dirname + '/webapps', controllerOptions));


app.use(layout());

app.use(cookieParser('boodskap inc'));
app.use(session({secret: '637e0554-7092-11e8-adc0-fa7ae01bbebc'}));


//For Template Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view options", {layout: "layout.html"});


var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){

app.post('/runsimulator/:simid', function (req, res) {

    var content = req.body.data;
    var simid = req.params["simid"];
    var url = "https://api.boodskap.io/push/raw/" + content.domainkey + "/" + content.apikey + "/SIMULATOR_" + content.simid + "/"+content.devModel+"/1.0/" + content.mid + "?type=JSON";
    var data ;
        
    console.log(new Date()+'-> sending simulate data from main... '+url);
    res.send('simulator starting...');

    // if(content.tl>0){
    //     if (simid == 'SIM-PMS'){
            
            
    //         PMS_UID = setInterval(() => {

    //             data = {
    //                 p1v: _.random(parseInt(content.p1vMin) ,parseInt(content.p1vMax)),
    //                 p2v: _.random(parseInt(content.p2vMin),parseInt(content.p2vMax)),
    //                 p3v: _.random(parseInt(content.p3vMin) ,parseInt(content.p3vMax)),
        
    //                 p1w: _.random(parseInt(content.p1wMin),parseInt(content.p1wMax)),
    //                 p2w: _.random(parseInt(content.p2wMin),parseInt(content.p2wMax)),
    //                 p3w: _.random(parseInt(content.p3wMin),parseInt(content.p3wMax)) 
    //             };
    //             var sending = {simid: simid,"data":data,"type":1};
    //             request({
    //                 url: url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ,
    //                 method: 'POST',
    //                 contentType:"application/x-www-form-urlencoded",
    //                 body:JSON.stringify(data)
                                
    //             },  function (error,response,body) {
    //                 if(!error) {
                    
    //                     // console.log("i did it");
    //                     // console.log(body);  
    //                     io.emit(simid, sending);
    //                     // res.send(JSON.stringify(sending));
    //                 }
    //             });
    //         }, content.tl);
    //     }else if(simid == 'SIM-RMS') {

          
    //        RMS_UID = setInterval(() => {
    //             data = {
    //                 // automode:content.autoMode,
    //                 // light: content.light, 
    //                 automode:parseInt(_.random(0,1)),
    //                 light:parseInt(_.random(0,1))
    //             };
    //             var sending = {simid: simid,"data":data, "type":1};
    //             request({
    //                 url: url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ,
    //                 method: 'POST',
    //                 contentType:"application/x-www-form-urlencoded",
    //                 body:JSON.stringify(data)
                                
    //             },  function (error,response,body) {
    //                 if(!error) {
                    
    //                     // console.log("i did it");
    //                     // console.log(body);  
    //                     io.emit(simid, sending);
    //                     // res.send(JSON.stringify(sending));
    //                 }
    //             });
    //         }, content.tl);
    //     }
    // }else{

    //     if (simid == 'SIM-PMS'){
    //         data = {
    //             p1v: _.random(parseInt(content.p1vMin) ,parseInt(content.p1vMax)),
    //             p2v: _.random(parseInt(content.p2vMin),parseInt(content.p2vMax)),
    //             p3v: _.random(parseInt(content.p3vMin) ,parseInt(content.p3vMax)),
    
    //             p1w: _.random(parseInt(content.p1wMin),parseInt(content.p1wMax)),
    //             p2w: _.random(parseInt(content.p2wMin),parseInt(content.p2wMax)),
    //             p3w: _.random(parseInt(content.p3wMin),parseInt(content.p3wMax)) 
    //         };
    //     }else if(simid == 'SIM-RMS'){
    //         data = {
    //             // automode:content.autoMode,
    //             // light: content.light, 
    //             automode:parseInt(_.random(0,1)),
    //             light:parseInt(_.random(0,1))
    //         };
    //     }
    //     var sending = {simid: simid,"data":data,"type":0};
    //     request({
    //         url: url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ,
    //         method: 'POST',
    //         contentType:"application/x-www-form-urlencoded",
    //         body:JSON.stringify(data)
                        
    //     },  function (error,response,body) {
    //         if(!error) {
            
    //             // console.log("i did it");
    //             // console.log(body);  
    //             io.emit(simid, sending);
    //             // res.send(JSON.stringify(sending));
    //         }
    //     });
    // }
    


    if(content.tl > 0) {
        // io.emit('simulator', sending);
        
       var INTER_ID = setInterval(function x(){
            // console.log(simid);
            if(simid == 'SIM-PMS') {
               
                console.log(PMS_UID);
                data = {
                    p1v: _.random(parseInt(content.p1vMin) ,parseInt(content.p1vMax)),
                    p2v: _.random(parseInt(content.p2vMin),parseInt(content.p2vMax)),
                    p3v: _.random(parseInt(content.p3vMin) ,parseInt(content.p3vMax)),
        
                    p1w: _.random(parseInt(content.p1wMin),parseInt(content.p1wMax)),
                    p2w: _.random(parseInt(content.p2wMin),parseInt(content.p2wMax)),
                    p3w: _.random(parseInt(content.p3wMin),parseInt(content.p3wMax)) 
                };
                PMS_UID = INTER_ID;
            }else if(simid == 'SIM-RMS'){
                
                // console.log(RMS_UID);
                data = {
                    automode:parseInt(_.random(0,1)),
                    light:parseInt(_.random(0,1))
                };
                RMS_UID = INTER_ID;
            }else {
                console.log('Undefined Simulator...');
            }
            var sending = {simid: simid,"data":data};

            console.log(new Date()+'-> sending '+simid+'simulate data from main... '+url);
            // var sending = {simid: INTER_ID,"data":data};
            request({
                url: url,
                method: 'POST',
                contentType:"application/x-www-form-urlencoded",
                body: JSON.stringify(data)
                            
            },function (error,response,body) {
                if(!error){   
                    io.emit(simid, sending);
                } else{
                    throw error;
                }
            });  
            return x;
        } (),content.tl); 
    }else {
        console.log("one time simulation...");
        if(simid == 'SIM-PMS') {
            data = {
                p1v: _.random(parseInt(content.p1vMin) ,parseInt(content.p1vMax)),
                p2v: _.random(parseInt(content.p2vMin),parseInt(content.p2vMax)),
                p3v: _.random(parseInt(content.p3vMin) ,parseInt(content.p3vMax)),
    
                p1w: _.random(parseInt(content.p1wMin),parseInt(content.p1wMax)),
                p2w: _.random(parseInt(content.p2wMin),parseInt(content.p2wMax)),
                p3w: _.random(parseInt(content.p3wMin),parseInt(content.p3wMax)) 
            };
    
        }else if(simid == 'SIM-RMS'){
            data = {
                automode:content.autoMode,
                light:content.light
            };
        }else {
            console.log('Undefined Simulator...');
        }
        var sending = {simid: simid,"data":data,"type":1};

        console.log(new Date()+'-> sending simulate data from main... '+url);
        request({
            url: url,
            method: 'POST',
            contentType:"application/x-www-form-urlencoded",
            body: JSON.stringify(data)
        },function (error,response,body) {
            if(!error){   
                io.emit(simid, sending);
            } else{
                throw error;
            }
        });  
    }
   
}); 

app.post("/stopsimulator/:simid", function(req,res){
    var simid = req.params["simid"];
    console.log(simid);
    if(simid == 'SIM-PMS'){
        console.log(simid+' stopping');
        if(PMS_UID == undefined){
            res.send('error');
            console.log('error');
            return;
        }
        clearInterval(PMS_UID);
        console.log(PMS_UID);
        res.send(simid);
    }else if(simid == 'SIM-RMS'){
        console.log(simid+' stopping');
        if(RMS_UID == undefined){
            res.send('error');
            console.log('error');
            return;
        }
        console.log(RMS_UID);
        clearInterval(RMS_UID);
        res.send(simid);
    }else {
        console.log('undefined simulator...');
    }
    // clearInterval(CircularJSON.parse(uid));
   
});

});



// io.on('disconnect', function(){
//     console.log('user disconnected');
//     app.post("/stopsimulator/:simid", function(req,res){
//         var simid = req.params["simid"];
//         console.log(simid);
//         clearInterval(simid);
//     });

// });


// io.on('connection', function(socket){
//     // socket.on('chat message', function(msg){
//       io.emit('simulator', "hello form server.");
//       setInterval( function(){io.emit('simulator',"hello form server..."+Date.now());}, 5000);
//     // });
// });



 
app.conf = conf;




console.log("************************************************************************************");
console.log(new Date() + ' | Boodskap IoT Platform Web Portal Listening on ' + conf['port']);
console.log("************************************************************************************");

server.listen(conf['port']);


//Initializing the web routes
var Routes = require('./routes/http-routes');
new Routes(app);


