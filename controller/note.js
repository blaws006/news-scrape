var db = require("../models");

module.exports = {
	//Find one specified note
	findOne: function (req, res) {
		db.Note.findOne({
				_id: req.params.id
			})
			.then(function (dbNote) {
				res.json(dbNote);
			})
			.catch(function (err) {
				res.json(err);
			});
	},
	//Create a singular note
	create: function (req, res) {
		db.Note.create(req.body)
			.then(function (dbNote) {
				res.json(dbNote)
			})
			.catch(function (err) {
				res.json(err);
			});
	},
	//Deletes a particular note
	delete: function (req, res) {
		db.Note.remove({
				_id: req.params.id
			})
			.then(function (dbNote) {
				res.json(dbNote);
			})
			.catch(function (err) {
				res.json(err);
			});
	}

}