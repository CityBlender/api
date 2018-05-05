require('./../utils/config');
const sk = require('./data/songkick');

const london = CONFIG.london_area

sk.fetchEvents(london);