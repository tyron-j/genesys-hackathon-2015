module.exports = {
	index: function (req, res) {
		res.render('index');
	},
	
	partials: function (req, res) {
		var partial = req.params.partial;

		res.render('partials/' + partial);
	}
};