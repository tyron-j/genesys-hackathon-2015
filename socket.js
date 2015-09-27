// deps
var io   = require('socket.io');
var http = require('http');

var app = require('./app.js');

// set up socket
var server = http.createServer(app);
var socket;

io(server).on('connection', function (_socket) {
	// expose client socket
	socket = _socket;

	console.log("Connected to client socket");

	// test
	_socket.emit('socketConnection', {
		msg: "Connected to server socket"
	});

	/*_socket.emit('clientChange', {
		hello: "world!"
	});*/

	_socket.on('disconnect', function () {
		console.log("Client disconnected");
	});
});

module.exports = {
	socket: socket,
	server: server
};