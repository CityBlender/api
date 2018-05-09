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
  console.log('Sucessfully connected to database');
});

// insert event function
async function insertEvent(object) {
  var event = new Event(object);

  event.save(function (err, event) {
    if (err) {
      if (err.code == 11000) {
        return console.log('Record already exists');
        // return console.log(err.properties)
        // return;
      } else {
        return console.error(err.message);
      }
    } else {
      return console.log(event.event_name + ' stored');
    }
  });

  return;
};

module.exports.insertEvent = insertEvent;



