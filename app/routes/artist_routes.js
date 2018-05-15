const helpers = require('../../utils/helpers');
const moment = require('moment');

const today = helpers.getTodayShort();
const tomorrow = helpers.getDayShort(1);

module.exports = function (app, db) {

  // today's events
  app.get('/artist/:artistId', (req, res) => {

    artist_id = parseInt(req.params.artistId)

    const query = {
      id: artist_id
    };

    db.collection('artists').find(query).toArray(function(err, results) {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(results);
      }
    });

  });
};