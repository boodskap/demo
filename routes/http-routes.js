var Routes = function (app) {

    this.app = app;
    this.init();

};
module.exports = Routes;
var express = require('express');
var app = express();

var fs = require('fs');
var _ = require('underscore');
// var $ = require('jquery');
var request = require("request");
// require('run-middleware')(app);

var server = require('http').Server(app);
var io = require('socket.io')(server);



io.on('connection', function(socket){
    // socket.on('chat message', function(msg){
      io.emit('simulator', "hello form server side.");
      setInterval( function(){io.emit('simulator',"hello form server side...");}, 5000);
    // });
});

Routes.prototype.init = function () {

    var self = this;
    //Session check each routes
    var sessionCheck = function (req, res, next) {
        var sessionObj = req.cookies['session_obj'];
        if (sessionObj) {
            next(); 
        } else {
            res.redirect('/login');
        }
    };

    //Role based session check
    var onlyAdmin = function (req, res, next) {
        var sessionObj = req.cookies['session_obj'];
        if (sessionObj) {
            var role = JSON.parse(sessionObj).user.roles;
            req.session.sessionObj = JSON.parse(sessionObj);

            if (role.indexOf('admin') !== -1 || role.indexOf('domainadmin') !== -1) {
                next();
            } else {
                console.log(new Date() + " | unauthorized access");
                res.sendStatus(401)
            }
        } else {
            res.redirect('/login');
        }
    };

    self.app.get('/', sessionCheck, function (req, res) {

        res.redirect('/pms');

    });

    self.app.get('/login', function (req, res) {
        var sessionObj = req.cookies['session_obj'];
        if (sessionObj) {
            res.redirect('/pms');
        } else {
            res.render('login.html', {layout: false});
        }
    });

    self.app.get('/pms', sessionCheck, function (req, res) {
        res.render('pms.html', {layout: ''});
    });
    self.app.get('/rms', sessionCheck, function (req, res) {
        res.render('rms.html', {layout: ''});
    });

    self.app.get('/readfile/:filename', function(req,res){

        // var reader = new FileReader();
        // reader.onload = function(){
        //   var dataURL = reader.result;
         
        // };
        fs.readFile(__dirname+"/../webapps/js/"+req.params['filename'], (err, data) => {
            if (err) throw err;
            res.send(data);
            res.end();
            
        });
    });


    self.app.post('/writefile/:filename', function (req, res) {

        var content = req.body.data;
        // console.log(req.params['filename']);
    
        fs.writeFile( __dirname+"/../webapps/js/"+req.params['filename'], content , function (err, data) {  
            if(err) throw err;
      
           res.end();
        });

        
    });
    
    // self.app.post('/runsimulator/:simid', function (req, res) {

    //     var content = req.body.data;
    //     var simid = req.params["simid"];
    //     var url = "https://api.boodskap.io/push/raw/" + content.domainkey + "/" + content.apikey + "/SIMULATOR_" + content.simid + "/"+content.devModel+"/1.0/" + content.mid + "?type=JSON";
    //     var data ;
    //     // console.log(req.params['simid']);
    //     // console.log(content);
    //     if(simid == "SIM-PMS"){
    //         console.log(simid);
    //         data = {
    //             p1v: _.random(parseInt(content.p1vMin) ,parseInt(content.p1vMax)),
    //             p2v: _.random(parseInt(content.p2vMin),parseInt(content.p2vMax)),
    //             p3v: _.random(parseInt(content.p3vMin) ,parseInt(content.p3vMax)),

    //             p1w: _.random(parseInt(content.p1wMin),parseInt(content.p1wMax)),
    //             p2w: _.random(parseInt(content.p2wMin),parseInt(content.p2wMax)),
    //             p3w: _.random(parseInt(content.p3wMin),parseInt(content.p3wMax)) 
    //         };
  
    //     }else if(simid == "SIM-RMS"){
    //         console.log(simid);

    //         data = {
    //             automode:content.autoMode,
    //             light: content.light, 
    //         };
    //     }else {
    //         console.log("other simid");

    //     }
    //     var sending = {simid: simid,"data":data};
    //     console.log(new Date()+'-> sending simulate data... '+url);
       
        
    //     res.send(" i did it...");

    //     // request({
    //     //     url: url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ,
    //     //     method: 'POST',
    //     //     contentType:"application/x-www-form-urlencoded",
    //     //     body:JSON.stringify(data)
                        
    //     // },  function (error,response,body) {
    //     //     if(!error) {
    //     //         console.log("i did it");
    //     //         console.log(body);  
    //     //         res.send("first");
    //     //     }
    //     // });

    //     if(content.tl > 0) {
    //         simid = setInterval(function(){
    //             console.log(new Date()+'-> sending simulate data... '+url);

    //             // app.runMiddleware('/runsimulator/'+simid,function(code,body,headers){
    //             //     console.log('User Details:',body);
    //             // });
    //             // request({
    //             //     url: "https://api.boodskap.io/push/raw/" + content.domainkey + "/" + content.apikey + "/SIMULATOR_" + content.simid + "/"+content.devModel+"/1.0/" + content.mid + "?type=JSON"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ,
    //             //     method: 'POST',
    //             //     contentType:"application/x-www-form-urlencoded",
    //             //     body: JSON.stringify(data)
                                
    //             // },  function (error,response,body) {
    //             //     // if(error) console.log("err:-- ",error);
    //             //     // if(response) console.log("res:-- ",response);
    //             //     if(body) console.log("body:-- ",body);
    //             //     if(!error){
    //             //         // var sending = {simid: simid,"data":data}
    //             //         res.write("simid");
    //             //     } 
    //             // });            
    //         }, content.tl); 
    //         // content.id =  setTimeout(sendSimData,content.tl);
    //         // setTimeout(() => {
    //         //     console.log('timeout');
    //         // }, 0);
    //     }
       
    // });


 
     
    /******************
     To add new routes
     ===================

     without session check
     =====================
     self.app.get('/<url_path_name>', function (req, res) {
        res.render('<html_name>.html', {layout: ''});
     });

     with session check
     ==================
     self.app.get('/<url_path_name>', sessionCheck, function (req, res) {
        res.render('<html_name>.html', {layout: ''});
     });


     ****************/



    self.app.get('/404', sessionCheck, function (req, res) {
        res.render('404.html', {layout: '', userRole: req.session.role});
    });

    self.app.get('/:key', function (req, res) {
        var sessionObj = req.cookies['session_obj'];
        if (!sessionObj) {
            res.render('login.html', {layout: false});

        } else {
            res.redirect("/404");
        }

    });


};

