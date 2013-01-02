var https = require('https');
var fs = require('fs');
var crypto = require('crypto');
var rand = fs.createReadStream('/dev/urandom');

// While benchmarking, I found there is too much backpressure
// at the default of 10 listeners (open requests). Polling the
// queue length at a 1ms resolution revealed that the listener
// queue can run up to 20 at a time while allowed.
rand.setMaxListeners(30);

var options = {
  pfx: fs.readFileSync('example.pfx')
};

https.createServer(options, serve).listen(8000);

function serve (req, res) {
  var mode = req.url.split('/').pop();

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });

  rand.once('data', function (data) {
    data = data.toString();

    if (!isNaN(parseInt(mode))) {
      res.end(data.slice(0, mode));
    } else if (mode == 'hash') {
      var hash = crypto.createHash('sha1');
      hash.update(data);
      res.end(hash.digest());
    } else if (mode == 'status') {
      res.end();
    } else {
      res.end(data);
    }
  });
}
