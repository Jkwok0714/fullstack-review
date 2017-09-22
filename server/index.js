let Middleware = require('./middleware');
let helper = require('../helpers/github');
let database = require('../database/index');

const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(Middleware.logger);

app.post('/repos', function (req, res) {
  // TODO - your code here!
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    var finalQuery = JSON.parse(body).query;
    // This route should take the github username provided
    // and get the repo information from the github API, then
    // save the repo information in the database
    var dataToAdd;
    helper.getReposByUsername(finalQuery)
    .then((data) => {
      data = JSON.parse(data);
      console.log(data);
      if (data.message) {
        throw 'User doesn\'t exist';
      } else {
        //Reformat data and save it
        dataToAdd = database.reformat(data);
        return database.saveMultiple(dataToAdd);
      }
    })
    .then(() => {
      return database.getTop25();
    })
    .then((top25) => {
      console.log('Got data, sending all good to client');
      res.status(200);
      res.set('Content-Type', 'application/json');
      // TODO: Send only 25 sorted by size
      res.end(JSON.stringify(top25));
    })
    .catch((err) => {
      console.error(err);
      res.status(404);
      res.set('Content-Type', 'application/json');
      // TODO: Send only 25 sorted by size
      res.end('Bad User');
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // console.log(req.query);
  database.getTop25()
  .then((data) => {
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
