const http = require('http');
var qs = require('querystring');
var cpuStat = require('cpu-stat');

var requests = require('request');


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
     // console.log(post.sender + " Data Received "+ post.count +" : "+ (timerescived - post.timesent));

      requests.post(
        {
          url: 'http://14.32.236.225:8080',
          form: { count : post.count ,timesent : post.timesent,  sender : post.sender}
        },
        function (err, httpResponse, body) {
          if (err) {
            console.log(err);
          } else {
           /* console.log("Message Sent at : " + post.timesent);
            console.log("\ndata Arrived at : " + body);*/
            response.end(body)
          }
        })

    })

  } else {
    console.log('other case requested...');
  }
}).listen(8080, function () { console.log('REST Data Center Running at http://210.102.181.221:8080'); });

var sendMessage = setInterval(()=>{
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
  
    //the percentage cpu usage over all cores
    console.log(percent);
  });
}, 100)


process.on('SIGINT', function () { console.log("IoT Service Process Terminated.."); clearInterval(sendMessage); process.exit(); });


