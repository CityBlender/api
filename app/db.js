require('./../utils/config');
const helpers = require('./../utils/helpers');
const mongoose = require('mongoose');

// import models
const Event = require('./models/Event');


// configure MongoDB URL based on the current environment
current_env = CONFIG.env

if (current_env == 'production') {
  mongo_url = CONFIG.db
} else {
  mongo_url = CONFIG.db_test
};

// connect to database
mongoose.connect(mongo_url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

// insert event function
function insertEvent(object) {
  var event = new Event(object);

  event.save(function (err, event) {
    if (err) return console.error(err.message);
  });
};

module.exports.insertEvent = insertEvent;



