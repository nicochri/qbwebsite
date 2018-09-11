// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  uid        	: String,
  email			: String,
  method		: String,
  mathHL		: String,
  mathHLSubID	: String,
  desiredQB		: String,
  stripeID		: String,
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
