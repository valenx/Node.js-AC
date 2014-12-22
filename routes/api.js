var express = require('express');
var router = express.Router();
var http = require('http');

router.route('/ledstrip')

  // get rgb led strip status (accessed at GET http://localhost:3000/ledstrip)
  .get(function(req, res) {
    console.log("/api/ledstrip");
    res.status(200).send("TODO");
  })

  .put(function(req, res) {
    var status = req.body;

    var p = status.power;
    var r = status.red;
    var g = status.green;
    var b = status.blue;

    var dataToSend = p + " " + r + " " + g + " " + b;

    // prepare the header
    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(dataToSend, 'utf8')
    };

    // Arduino settings
    var postoptions = {
      host: '192.168.10.6',
      path: '/',
      port: 80,
      method: 'PUT',
      headers : postheaders
    };

    var arduinoRequest = http.request(postoptions, function(response) {
      res.sendStatus(response.statusCode);
      /*var data = ''

      response.on('data', function(chunk) {
        data += chunk;
        console.log("arduino data: " + data);
      });

      response.on('end', function () {
        console.log("arduino data: " + data);
        res.sendStatus(response.statusCode);
      });*/
    });

    arduinoRequest.on('socket', function(socket) {
      socket.setTimeout(1000);  
      socket.on('timeout', function() {
        console.log("Timeout, aborting request")
        arduinoRequest.abort();
      });
    });
    arduinoRequest.on('error', function(err) {
      console.log("error: " + err.message);
      // error callback will receive a "socket hang up" on timeout
      if (err.code === "ECONNRESET") {
        res.sendStatus(408);
        //specific error treatment
      } else {
        res.sendStatus(408);
      }
    });
    arduinoRequest.write(dataToSend);
    arduinoRequest.end();
  });

module.exports = router;