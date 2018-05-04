const helpers = require('../../utils/helpers');
const moment = require('moment');

const today = helpers.getToday();
const tomorrow = helpers.getDay(1);

console.log(today)
console.log(tomorrow)

module.exports = function (app, db) {

  // today's events
  app.get('/london/events/today', (req, res) => {

    const query = {
      // start_date: '2018-05-04'
      start_datetime: {
        $gte: today.toDate(),
        $lte: tomorrow.toDate()
      }
    };

    const sort = {
      event_popularity: -1
    }

    const projection = {
      event_name: 1,
      event_url: 1,
      event_type: 1,
      event_popularity: 1,
      start_datetime: 1,
      location: 1,
      venue_id: 1,
      venue_name: 1,
      venue_location: 1,
      artists: 1
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