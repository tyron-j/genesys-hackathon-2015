module.exports = {
	index: function () {
		res.render('index');
	},
	
	partials: function (req, res) {
		var partial = req.params.partial;

		res.render('partials/' + partial);
	}
};