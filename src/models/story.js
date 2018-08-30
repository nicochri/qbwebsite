// import node modules
const mongoose = require('mongoose');

// define a schema
const StoryModelSchema = new mongoose.Schema ({
  user_id	    : String,
  question_id   : String,
  correct  		: String,
});

// compile model from schema
module.exports = mongoose.model('StoryModel', StoryModelSchema);