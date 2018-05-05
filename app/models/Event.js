const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = new mongoose.Schema({
  event_id: {
    type: Number,
    index: true,
    unique: 'Two events cannot share the same event_id ({VALUE})'
  },
  event_name: String,
  event_type: String,
  event_url: String,
  event_popularity: Number,
  datetime: Date,
  datetime_string: String,
  date: String,
  time: String,
  location: {
    x: Number,
    y: Number
  },
  venue: {
    id: Number,
    name: String,
    location: {
      x: Number,
      y: Number
    }
  },
  artists: Array,
  fetched_at: {
    type: Date,
    default: Date.now
  }
});

eventSchema.plugin(uniqueValidator);
const Event = mongoose.model('Event', eventSchema, 'events');

module.exports = Event;