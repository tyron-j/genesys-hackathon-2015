// deps
var app    = require('../app.js');
var socket = require('../socket.js').socket;

module.exports = {
	getUser: function (req, res) {
		// example
	}
};

// routes
app.get('/api/user', getUser);

// test
setTimeout(function () {
	socket.broadcast.emit('clientChange', {
		hello: "world!"
	});
});