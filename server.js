var express = require('express');
var path = require('path');
var fs = require('fs');  // for loading localhost test certs
var os = require('os');
var https = require('https'); 
var http  = require('http');  
var toobusy = require('toobusy-js');   // https://www.npmjs.com/package/toobusy-js
var bodyparser = require('body-parser');
var mongojs = require('mongojs');
var bodyparser = require('body-parser');
var platform = require('./node_server/platform.js').configure();
var db = mongojs ('mongodb://maiterojo:maiterojo@ds217138.mlab.com:17138/portfolio');
var app = express(); 
app.enable('trust proxy'); // needed for req.secure for bluemix


 app.use(bodyparser.urlencoded({ extended: false }));
 app.use(bodyparser.json());

app.get('/api', function(req, res) {
		var collection = db.collection('portfolio');
		collection.find(function(err,valores){
			if(err){
				res.send(err);
			}else{
				res.json(valores);
				
			}
	}) 
	});


app.post('/apiBanks/:id', function(req,res,next){
    var item = req.body;
	var id=req.params.id; 
console.log('----')
console.log(item)
console.log('----')
            var collection = db.collection('portfolio');
    collection.update({_id:mongojs.ObjectId(id)},item,{},function(err,perfil){
        if(err){
            res.send(err);console.log('err');
            console.log(err);
        }else{
            res.json(perfil);console.log('perfil');
            console.log(perfil);
        }
    });
    
});
	
	
 
// middleware which blocks requests when we're too busy 
app.use(function(req, res, next) {  // HAS TO BE FIRST 
  if (toobusy()) {
     res.status(503).send("<p><p>&nbsp&nbsp<h1>The server is busy, please try later, possibly in about 30 seconds.</h1>");
  } else {
       next();
  }
});


app.use (function (req, res, next) {  // req.protocol
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else { // request was via http, so redirect to https
				console.log("redirecting from http to https");
				console.log('https://' + req.headers.host + req.url);
                res.redirect('https://' + req.headers.host + req.url);
        }
});
 
app.use(   "/",  
			express.static(__dirname + '/_ngClient')    
);
 
app.use( // alias to third party js code etc
			"/js_thirdparty", //the URL throught which you want to access   content
			express.static(__dirname + '/js_thirdparty') 
);		
app.use( //  alias mapping
			"/node_modules", //the URL throught which you want to access   content
			express.static(__dirname + '/node_modules') 
);
/*
app.use( // alias to third party js code manged by bower
			"/bower_components", //the URL throught which you want to access   content
			express.static(__dirname + '/bower_components') 
);			
 */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/_ngClient/index.html'));
});

// all the server rest type route paths are mapped in index.js
app.use('/', require('./routes')); // will load/use index.js by default from this folder

app.use(function(req, res, next) { // If no route is matched by now, it must be a 404
	console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    var err = new Error('Route Not Found, are you using the correct http verb / is it defined?\n\n' + req.method + "\t" + req.path + "\n\n");
    err.status = 404;		 
    next(err);
});


if (platform.isLocalHost) { //was cfCore.isLocal
// openssl genrsa -out test-key.pem 1024 
// openssl req -new -key test-key.pem -out certrequest.csr
// openssl x509 -req -in certrequest.csr -signkey test-key.pem -out test-cert.pem	
	console.log("*** Using temp SSL keys on the nodejs server");
	var privateKey   = fs.readFileSync('ssl/test-key.pem');
	var certificate  = fs.readFileSync('ssl/test-cert.pem'); 

    var localCertOptions = {  // use local self-signed cert
        key: privateKey, 
        cert: certificate, 
        requestCert: false, 
        rejectUnauthorized: false 
    }; 		
		
    https.createServer (localCertOptions, app).listen (platform.port, function () { 
	   console.log(new Date().toISOString());
	   console.log(__dirname + '/_ngClient');
    }); 
 	
} else { // not local, its in the cloud somewhere, assuming cloud provides ssl certs

    if (platform.architecture === "bluemix") // could refactor next 2, leaving separate incase needed in future
	{
		app.listen(platform.port, function() {
		    console.log (platform.architecture + ' server startup port: ' + platform.port); 
		}); 
	}
	else 
		if (platform.architecture === "heroku")
	{ 
		app.listen(platform.port, function() {
		    console.log (platform.architecture + ' server startup port: ' + platform.port); 
		}); 			
	}		
}    