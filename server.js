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

var PMS_UID,RMS_UID,FM_UID,TH_UID ;

var app = express();
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var compression = require('compression');

// app.use('fs', fs);
/*******************************
 * Require Configuration
 ****************************/
var conf = require("./config");

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
    if(PMS_UID) io.emit('pms','simulator running...');
    if(RMS_UID) io.emit('rms', 'simulator running...');
    if(FM_UID) io.emit('fm', 'simulator running...');
    if(TH_UID) io.emit('th', 'simulator running...');


    // console.log('socket connection: ', io.sockets.connected);
    // if(! io.sockets.connected) {
    //     throw new Error('socket connection error...');
    // }else{
    //     io.emit('status','simulator not running...');
    // }
app.post('/runsimulator/:simid', function (req, res) {

    var content = req.body.data;
    var simid = req.params["simid"];
    var url = "https://api.boodskap.io/push/raw/" + content.domainkey + "/" + content.apikey + "/SIMULATOR_" + content.simid + "/"+content.devModel+"/1.0/" + content.mid + "?type=JSON";
    var data ;
        
    console.log(new Date()+'-> sending simulate data from main... '+url);
    res.send('simulator starting...');

    if(content.tl > 0) {
        // io.emit('simulator', sending);
     
        var INTER_ID = setInterval(function imRun(){
            // console.log(simid);
            if(simid == 'SIM-PMS') {
                // console.log(PMS_UID);
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
            }else if(simid == 'SIM-FM'){
                data = {
                    pulse:_.random(parseFloat(content.fmMin),parseFloat(content.fmMax))
                };
                FM_UID = INTER_ID;
            }else if( simid == 'SIM-TH'){ 
                data = {
                    tinc: _.random(parseFloat(content.tincMin) ,parseFloat(content.tincMax)),
                    tinf: _.random(parseFloat(content.tinfMin) ,parseFloat(content.tinfMax)),
                    hum: _.random(parseFloat(content.humMin) ,parseFloat(content.humMax))
                };
                TH_UID = INTER_ID;
            }else {
                console.log('Undefined Simulator...');
            }
            var sending = {simid: simid,"data":data};
            // io.emit(simid, sending);
            console.log(new Date()+'-> sending '+simid+' simulate data from main... '+url);
            request({
                url: url,
                method: 'POST',
                contentType:"application/x-www-form-urlencoded",
                body: JSON.stringify(data)
                // data:JSON.stringify(data)
            },function (error,response,body) {
                if(!error){   
                    io.emit(simid, sending);
                } else{
                    throw error;
                }
            });  
            return imRun;
        }(),content.tl); 
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
        }else if(simid == 'SIM-FM'){
            data = {
                pulse:_.random(content.fmMin,content.fmMax)
            };
          
        }else if( simid == 'SIM-TH'){ 
            data = {
                tinc: _.random(content.tincMin,content.tincMax),
                tinf: _.random(content.tinfMin,content.tinfMax),
                hum: _.random(content.humMin,content.humMax)
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
if(! io.sockets.connected) {
    throw new Error('socket connection error...');
}
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
        PMS_UID ='';
        // console.log(PMS_UID);
        res.send(simid);
    }else if(simid == 'SIM-RMS'){
        console.log(simid+' stopping');
        if(RMS_UID == undefined){
            res.send('error');
            console.log('error');
            return;
        }
        // console.log(RMS_UID);
        clearInterval(RMS_UID);
        RMS_UID = '';
        res.send(simid);
    }else if(simid == 'SIM-FM'){
        console.log(simid+' stopping');
        if(FM_UID == undefined){
            res.send('error');
            console.log('error');
            return;
        }
        // console.log(FM_UID);
        clearInterval(FM_UID);
        FM_UID = '';
        res.send(simid);
    }else if(simid == 'SIM-TH'){
        console.log(simid+' stopping');
        if(TH_UID == undefined){
            res.send('error');
            console.log('error');
            return;
        }
        // console.log(TH_UID);
        clearInterval(TH_UID);
        TH_UID = '';
        res.send(simid);
    }else {
        console.log('undefined simulator...');
    }
    // clearInterval(CircularJSON.parse(uid));
   
});

});
 
app.conf = conf;




console.log("************************************************************************************");
console.log(new Date() + ' | Boodskap IoT Platform Web Portal Listening on ' + conf['port']);
console.log("************************************************************************************");

server.listen(conf['port']);


//Initializing the web routes
var Routes = require('./routes/http-routes');
new Routes(app);

