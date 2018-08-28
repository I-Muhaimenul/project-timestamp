// server.js
// where your node app starts
// Author Muhaimenul Islam (www.github.com/I-Muhaimenul)

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  
  var input = req.params.date_string;
  if(!input){
    var outputUnix = parseInt((Date.now()).toFixed(0));
  }else{
    var isNum = /^[0-9]+$/.test(input);
    if (isNum) {
      var date = parseInt(input)
    } else {
      var date = parseInt((new Date(input).getTime()).toFixed(0));
    }

    if(date == 'Invalid Date' || !date || date == 'NaN'){
      res.json({error: 'Invalid Date' })
    }else {
      var outputUnix = date
    }

  }
  
  var outputUtc = new Date(outputUnix).toUTCString();

  var output = {
    unix: outputUnix,
    utc: outputUtc
  }
  // console.log(res);

  res.json(output)
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});