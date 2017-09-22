var Middleware = require('./middleware');

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
    console.log(JSON.parse(body).query);
    // This route should take the github username provided
    // and get the repo information from the github API, then
    // save the repo information in the database
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify('Stuffington'));
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log(req.query);
  res.status(200);
  res.set('Content-Type', 'application/json');
  res.end('Stuff');
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
