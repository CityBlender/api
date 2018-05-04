const moment = require('moment');

const date_format = 'YYYY-MM-DD'
const today = moment().startOf('day')
const tomorrow = moment(today).add(1, 'days')

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

    db.collection('events').find(query).toArray(function(err, results) {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(results);
      }
    });

  });
};