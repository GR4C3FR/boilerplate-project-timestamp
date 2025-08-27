// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html'); // Corrected path to index.html
});

// API endpoint for timestamp microservice
app.get("/api/:date_string?", function (req, res) {
  const dateString = req.params.date_string;
  let date;

  if (!dateString) {
    // If date_string is empty, return current time
    date = new Date();
  } else {
    // Check if it's a Unix timestamp (all digits)
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString)); // Parse as integer for Unix timestamp
    } else {
      date = new Date(dateString); // Parse as date string
    }
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
