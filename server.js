var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var util = require('util');

var app = express();

app.use(express.static('public'));
app.use(session({
	secret: 'hopethisworks',
	resave: true,
    saveUninitialized: true
}));

app.set('views', process.cwd()+'/app/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

require(process.cwd()+'/app/routes/index.server.route.js')(app);
require(process.cwd()+'/app/routes/user.server.route.js')(app);

var log_file=fs.createWriteStream(__dirname+'/debug.log', {flag: 'a'});
var log_stdout=process.stdout;

console.log=function(d){
	log_file.write(util.format(d)+'\n');
	log_stdout.write(util.format(d)+'\n');
};

app.listen('20000', function(){
	console.log('SS-PANEL listening on port 20000');
});