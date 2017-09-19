var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 3001

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/client/public')))

app.listen(port, () => {
  console.log('App is listening to port ' + port);
})

module.exports = app;