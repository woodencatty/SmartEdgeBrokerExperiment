const http = require('http');
var qs = require('querystring');

http.createServer(function (request, response) {

  if (request.method == 'GET') {
    if (request.url == '/') {
      timeNow = new Date().getTime();
      response.end(timeNow.toString());
    }
  }
  else if (request.method == 'POST') {

    var body = '';
    request.on('data', function (data) {
      body += data;
    })
    request.on('end', function () {
      var post = qs.parse(body);
      var timerescived = new Date().getTime();

      console.log(post.sender + " Data Received "+ post.count +" : "+ (timerescived - post.timesent));

      response.end(post.timesent)
    })

  } else {
    console.log('other case requested...');
  }
}).listen(8080, function () { console.log('REST Data Center Running at http://210.102.181.221:8080'); });