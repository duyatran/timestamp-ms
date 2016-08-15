var express = require('express');
var path = require('path');
var url = require('url');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/:time', function(req, res) {
  var param = decodeURI(req.params.time);
  // Date takes UNIX timestamp, but in milliseconds
  param = (isNumeric(param)) ? parseFloat(param)*1000 : param; 
  var date = new Date(param);
  var output = {"unix": null, "natural": null};
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  if (isValidDateInstance(date)) {
    output.unix = date.getTime() / 1000;
    output.natural = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  }
  res.json(output);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* This function tests for valid Date object, not for valid dates.
   Best to separate the two. Copied from and more info at: http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
*/
function isValidDateInstance(d) {  
  return ( Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime()) );
}



