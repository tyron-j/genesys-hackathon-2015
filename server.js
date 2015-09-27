// deps

var express    = require('express');
var bodyParser = require('body-parser');

// var api = require('./routes/api');
var views = require('./routes/views.js');

// app

var app = express();

app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.get('/', views.index);
app.get('/partials/:partial', views.partials);

// startup

app.listen(app.get('port'), function () {
	console.log("Runnning at localhost: " + app.get('port'));
});