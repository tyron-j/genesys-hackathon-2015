module.exports = {
	index: function (req, res) {
		console.log("getting index");
		res.render('index');
	},
	
	partials: function (req, res) {
		var partial = req.params.partial;

		console.log("getting partial");
		res.render('partials/' + partial);
	}
};