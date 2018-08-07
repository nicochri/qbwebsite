// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  gid        	: String,
  mathHL		: String,
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
