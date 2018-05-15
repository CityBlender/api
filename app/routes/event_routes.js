const helpers = require('../../utils/helpers');
const moment = require('moment');

const today = helpers.getTodayShort();
const tomorrow = helpers.getDayShort(1);

module.exports = function (app, db) {

  // today's events
  app.get('/london/events/today', (req, res) => {

    const query = {
      // start_date: '2018-05-04'
      date: today
    };

    const sort = {
      event_popularity: -1
    }

    const projection = {
      name: 1,
      url: 1,
      type: 1,
      popularity: 1,
      date: 1,
      time: 1,
      datetime: 1,
      location: 1,
      venue: 1,
      artists: 1,
      spotify: 1,
      lastfm: 1,
      foursquare: 1
    };

    db.collection('events').find(query).sort(sort).project(projection).toArray(function(err, results) {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(results);
      }
    });

  });
};