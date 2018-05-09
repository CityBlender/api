const helpers = require('./../../utils/helpers')
const keys = require('./../../utils/keys');
const db = require('./../db');
const moment = require('moment');


const today = helpers.getTodayShort();

// getEvents()
//  - returns an object with all the data provided by SongKick
async function getEvents (area, min_date = today, max_date = today, page = 1, results = 50) {

  // construct API call
  const key = keys.getSongkickKey();
  const url = 'http://api.songkick.com/api/3.0/metro_areas/' + area + '/calendar.json?min_date=' + min_date + '&max_date=' + max_date + '&per_page=' + results + '&page=' + page + '&apikey=' + key;

  // get results as JSON object
  const data = await helpers.getJSON(url).then(res => res);

  // return all data
  const total_entries = data['resultsPage']['totalEntries'];
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

  // shift by one to remove empty event
  all_events.shift();

  console.log('Got a total of ' + all_events.length + ' events for area ' + area);

  // return all events in a single array
  return all_events;

}

module.exports.getEventsArray = getEventsArray;



async function fetchEvents(area) {

  const events = await getEventsArray(area);

  events.forEach(function (event) {

    var artists = [];

    event['performance'].forEach(function name(artist) {
      var identifier = artist['artist']['identifier'][0]

      if (identifier) {
        var mbid = artist['artist']['identifier'][0]['mbid'];
      } else {
        var mbid = null;
      }

      var artist = {
        mbid: mbid,
        name: artist['displayName'],
        songkick_id: artist['artist']['id'],
        songkick_url: artist['artist']['uri'],
        billing_index: artist['billingIndex'],
        billing: artist['billing']
      };
      artists.push(artist);
    });

    // check if datetime exists
    var datetime = event['start']['datetime'];

    if (datetime) {
      var event_datetime = moment.parseZone(datetime).utc().format();
      var event_datetime_string = datetime
    } else {
      var event_datetime = null;
      var event_datetime_string = null;
    }

    // check if time exists
    var time = event['start']['time']

    if (time) {
      var event_time = time;
    } else {
      var event_time = null;
    }

    // combine everything into a single object
    var event = {
      event_id: event['id'],
      event_name: event['displayName'],
      event_type: event['type'],
      event_url: event['uri'],
      event_popularity: event['popularity'],
      datetime: event_datetime,
      datetime_string: event_datetime_string,
      date: event['start']['date'],
      time: event_time,
      location: {
        x: event['location']['lng'],
        y: event['location']['lat']
      },
      venue: {
        id: event['venue']['id'],
        name: event['venue']['displayName'],
        location: {
          x: event['venue']['lng'],
          y: event['venue']['lat']
        }
      },
      artists: artists
    };

    // insert object into database
    db.insertEvent(event);

  });

  console.log('All events successfully stored in a database');

  return;
}

module.exports.fetchEvents = fetchEvents;