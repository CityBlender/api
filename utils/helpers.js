const moment = require('moment');

exports.getToday = function () {
  day = moment().startOf('day').format();
  return day;
}

exports.getDay = function (day_offset) {
  day = moment().add(day_offset, 'day').startOf('day').format();
  return day;
}
