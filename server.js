require('./utils/config');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');


// configure Express server
const app = express();
const port = CONFIG.port;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


  // Pass to next layer of middleware
  next();
});

// configure MongoDB URL based on the current environment
current_env = CONFIG.env

if (current_env == 'production') {
  mongo_url = CONFIG.db
} else {
  mongo_url = CONFIG.db_test
};

// require('./app/fetch');

// connect to MongoDB
MongoClient.connect(mongo_url, (err, client) => {
  // throw error if connection is not successful
  if (err) return console.log(err);

  // get database name
  db = client.db('london');
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log('Database connected. We are now live on ' + port);
  });
});


// mongoose.connect(mongo_url);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//   console.log('connected to DB!!!');
// });
