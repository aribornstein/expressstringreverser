
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var url = require('url');
var MsTranslator = require('mstranslator');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.configure('development', function () { app.locals.pretty = true; });


// development only
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

//index route
app.get('/', routes.index);


//translate route
app.get('/api/translate', function (req, res) {
    

    var url_parts = url.parse(req.url, true);
    var input = url_parts.query;

    //do translate call here
    var client_secret = "put key here";
    var client_id = "PythicStringReverser";
    
    console.log(client_id);
    if (!client_secret || !client_id) {
        console.log('client_secret and client_id missing');
        process.exit(1);
    }
    
    var toBeTrans = input["input"];
    var params = {
        text: toBeTrans,
        from: 'en',
        to: 'he'
    };
    
    var client = new MsTranslator({
        client_id: client_id,
        client_secret: client_secret
    });
    
    client.initialize_token(function () {
        client.translate(params, function (err, data) {
            if (err) console.log('error:' + err);
            res.send(data);
           
        });
    });

    
    //


});

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});


