const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGOD_URI || 'mongodb://localhost/project3'
);

module.exports = mongoose.connection;