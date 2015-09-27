// deps

var bodyParser = require('body-parser');
var express    = require('express');

var views = require('./routes/views.js');

// app

var app = module.exports = express();

app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.get('/', views.index);
app.get('/partials/:partial', views.partials);