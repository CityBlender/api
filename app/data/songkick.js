const helpers = require('./../../utils/helpers')
const keys = require('./../../utils/keys');
const today = helpers.getTodayShort();
const request = require('request');

// getEvents()
//  - returns an object with all the data provided by SongKick
async function getEvents (area, min_date = today, max_date = today) {

  // construct API call
  const page = 1;
  const results = 50;
  const key = keys.getSongkickKey();
  const url = 'http://api.songkick.com/api/3.0/metro_areas/' + area + '/calendar.json?min_date=' + min_date + '&max_date=' + max_date + '&per_page=' + results + '&page=' + page + '&apikey=' + key;

  // get API results as JSON object
  const data = await helpers.getJSON(url).then(res => res);
  const total_entries = data['resultsPage']['totalEntries'];

  console.log('Fetched ' + total_entries + ' entries for area ' + area);


  // return whole object
  return data;
};


// fetchEvents() - returns an array of events
async function returnEventsObject(area, min_date = today, max_date = today) {

  // set up variables
  const page = 1;
  const results = 50;
  const data = await getEvents(area);
  const events = data['resultsPage']['results']['event'];
  const total_entries = data['resultsPage']['totalEntries'];

  console.log('Parsing ' + total_entries + ' entries for area ' + area);
  // loop through
  // while (total_entries > results) {

  // }


}

returnEventsObject('24426')




