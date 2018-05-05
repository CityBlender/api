const helpers = require('./../../utils/helpers')
const keys = require('./../../utils/keys');

const today = helpers.getTodayShort();

// getEvents()
//  - returns an object with all the data provided by SongKick
async function getEvents (area, min_date = today, max_date = today, page = 1, results = 50) {

  // construct API call
  const key = keys.getSongkickKey();
  const url = 'http://api.songkick.com/api/3.0/metro_areas/' + area + '/calendar.json?min_date=' + min_date + '&max_date=' + max_date + '&per_page=' + results + '&page=' + page + '&apikey=' + key;

  // get results as JSON object
  console.log('Getting data for area ' + area);
  const data = await helpers.getJSON(url).then(res => res);

  // return all data
  const total_entries = data['resultsPage']['totalEntries'];
  console.log('Fetched ' + total_entries + ' entries for area ' + area);
  return data;
};


// fetchEvents()
//  - returns an array of events from all the pages
async function getEventsArray(area, min_date = today, max_date = today) {

  // make default variables explicit
  var page = 1;
  var results = 50;

  // make the initial call
  var data = await getEvents(area);

  // only get events data
  var events = data['resultsPage']['results']['event'];

  // get the total number of entries for a given call
  var total_entries = data['resultsPage']['totalEntries'];

  // create an empty array for collecting all pages
  var all_events = [];

  // add first bunch of events to an array
  all_events.push(events);

  for (var event in events) {
    if (events.hasOwnProperty(event)) {
      all_events.push(events[event]);
    }
  }


  // loop through the pages
  while (total_entries > results) {
    page = page + 1; // increase page count
    total_entries = total_entries - results; // reduce total by no. of results
    data = await getEvents(area, today, today, page, results); // get data from next page
    new_events = data['resultsPage']['results']['event'];

    // append new events
    for (var event in new_events) {
      if (events.hasOwnProperty(event)) {
        all_events.push(new_events[event])
      }
    }
  }

  // return all events in a single array
  return all_events

}

module.exports.getEventsArray = getEventsArray;




