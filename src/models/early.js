// import node modules
const mongoose = require('mongoose');

// define a schema
const EarlyModelSchema = new mongoose.Schema ({
  email        	: String,
});

// compile model from schema
module.exports = mongoose.model('EarlyModel', EarlyModelSchema);
