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

// My custum functions
function getNames(MongoClient){
	MongoClient.connect(mongoURL, function(err, db) {
		str = "";
	    var cursor = db.collection('storymodels').find();

	    cursor.each(function(err, item) {
	        if (item != null) {
	          str = str + "    Employsee id cs newcvcv" + item.creator_name + "</br>";
	        }
	    });
	    console.log('Loaded employeed ids and ready to send');
	    return str;
  	});
}

function insertQBinstance(MongoClient){
  	MongoClient.connect(mongoURL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("catbookdb");
	  var myobj = { creator_id: "Company Inc", creator_name: "Highway 37" };
	  dbo.collection("qbinstancemodels").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});
}

function saveNewPurchase(MongoClient, params) {
	// params - gid and questionbank name that was bought
	MongoClient.connect(mongoURL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("catbookdb");

	  // Check if the user has already purchased something
	  var query = { gid: params.gid };
	  var user = [];
	  dbo.collection("qbaccess").find(query).toArray(function(err, result) {
	    if (err) throw err;
	   
	    //If user already has a document
	    if (result.length == 1) {
	    	console.log('updating user');

	    	var myquery = { gid: params.gid };
	    	var newvalues = { $set: { mathHL: params.mathHL } };
	    	dbo.collection("qbaccess").updateOne(myquery, newvalues, function(err, res) {
			    if (err) throw err;
			    console.log("1 document updated");
			});
	    }

	    //If it's the user's first purchase
	    else {
	    	var myobj = { gid: params.gid, mathHL: params.mathHL };
	    	dbo.collection("qbaccess").insertOne(myobj, function(err, res) {
			    if (err) throw err;
			    console.log("1 document inserted");
			});
	    }

	    db.close();
	  });




	  // var myobj = { creator_id: "Company Inc", creator_name: "Highway 37" };
	  // dbo.collection("qbinstancemodels").insertOne(myobj, function(err, res) {
	  //   if (err) throw err;
	  //   console.log("1 document inserted");
	  //   db.close();
	  // });
	});
}

// API function
function dbfunction(MongoClient, functionName, params) {
	switch(functionName) {
	    case 'getNames':
	        getNames(MongoClient);
	        break;
	    case 'insertQBinstance':
	        insertQBinstance(MongoClient, params);
	        break;
	    case 'saveNewPurchase':
	        saveNewPurchase(MongoClient, params);
	        break;
	    default:
	    console.log('The inserted database function was not found');
	}
}

module.exports = db;
module.exports.dbfunction = dbfunction;
