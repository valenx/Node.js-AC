var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ArduinoControl' });
});

router.post('/ledstrip', function(req, res) {
  if (!req.body || (req.body.ledstrip != 0 && req.body.ledstrip != 1)) {
    return res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }

  // create the JSON object
  var jsonObject = JSON.stringify(req.body);

  // prepare the header
  var postheaders = {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
  };

  // Arduino settings
  var postoptions = {
    host: '192.168.10.5',
    path: '/',
    port: 80,
    method: 'POST',
    headers : postheaders
  };

  var arduinoRequest = http.request(postoptions, function(response) {
    var data = ''
    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function () {
      // TODO
      console.log("arduino res: " + data);
    });
  });

  arduinoRequest.write(jsonObject);
  arduinoRequest.end();
  arduinoRequest.on('error', function (err) {
    // TODO
    console.log(err);
  }); 
});

module.exports = router;
