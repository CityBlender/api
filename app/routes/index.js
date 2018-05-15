const eventRoutes = require('./event_routes');
const artistRoutes = require('./artist_routes');

module.exports = function (app, db) {
  eventRoutes(app, db);
  artistRoutes(app, db);
};