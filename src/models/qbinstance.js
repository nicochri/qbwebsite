// import node modules
const mongoose = require('mongoose');

// define a schema
const QBinstanceModelSchema = new mongoose.Schema ({
  creator_id    : String,
  access_code   : String,
});

// compile model from schema
module.exports = mongoose.model('QBinstanceModel', QBinstanceModelSchema);