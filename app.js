var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
var position = require('./models/position');
var authentication = require('./routes/authentication');
var insertion = require('./routes/insertion');
var find = require('./routes/find');
var deletion = require('./routes/deletion');
var cronOps = require('./actions/cron-ops');

app.options("/*", function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Request-With');
	res.sendStatus(200);
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/find', find);
app.use('/api/insert', insertion);
app.use('/api/delete', deletion);
app.use('/api/auth', authentication);

app.get('/', function(req, res, next) {
	res.send('hey');
});

require('./routes/routes')(app);

var cron = new cronOps();

app.listen(port);

console.log('Run Forrest Run! ' + port + ' miles!');