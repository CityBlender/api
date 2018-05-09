const moment = require('moment');
const request = require('request');
const axios = require('axios');

// dates
exports.getToday = function () {
  day = moment().startOf('day').toDate();
  return day;
};

exports.getTodayShort = function () {
  day = moment().startOf('day').format('YYYY-MM-DD');
  return day;
};

exports.getDay = function (day_offset) {
  day = moment().add(day_offset, 'day').startOf('day').toDate();
  return day;
};

exports.getDayShort = function (day_offset) {
  day = moment().add(day_offset, 'day').startOf('day').format('YYYY-MM-DD');
  return day;
};

// get JSON
async function getJSON (url) {
  try {
    const result = await axios(url);
    return await result.data;
  } catch (e) {
    console.error(e);
  }
};

module.exports.getJSON = getJSON;
