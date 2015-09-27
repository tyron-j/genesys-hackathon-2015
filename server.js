// startup
var app    = require('./app.js');
var server = require('./socket.js').server;
var api    = require('./routes/api.js');

server.listen(app.get('port'), function () {
	console.log("Listening on port: " + app.get('port'));
});