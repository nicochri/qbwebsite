const mongoose = require('mongoose');

// set up mongoDB connection
const mongoURL = process.env.MLAB_URL; // config variable
const options = {
  useMongoClient: true
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function getNames(mongoClient, mongoURL){

	str = "";
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect(process.env.MLAB_URL, function(err, db) {
		console.log('1');
	    var cursor = db.collection('storymodels').find();

	    cursor.each(function(err, item) {
	        if (item != null) {
	          str = str + "    Employee id  " + item.creator_name + "</br>";
	        }
	    });

	    return str;
  	});
 //  	str = "heyther";
 //  	console.log(str);
	// return str;
}

module.exports = db;
module.exports.mongoURL = mongoURL;
module.exports.getNames = getNames;