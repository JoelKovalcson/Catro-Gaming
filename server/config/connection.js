const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGOD_URI || 'mongodb://localhost/catroGaming'
);

module.exports = mongoose.connection;