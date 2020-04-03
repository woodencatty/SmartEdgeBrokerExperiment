var mosca = require('mosca');
var requests = require('request');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Published', packet.payload);

  requests.post(
    {
      url: 'http://210.102.181.221:8080',
      form: { packet}
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

});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

process.on('SIGINT', function () { console.log("Smart Broker Process Terminated.."); process.exit(); });