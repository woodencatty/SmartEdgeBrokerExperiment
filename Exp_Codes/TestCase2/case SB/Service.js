var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.168:1883')
var qs = require('querystring');

client.on('connect', function () {
  client.subscribe('/Data', function (err) {
    if (!err) {
      console.log("Subscribe Complete")
    }
  })
})

client.on('message', function (topic, message) {
  timeNow = new Date().getTime();

  var data = JSON.parse(message.toString());

  console.log('Message Arrived from '+data.sender +' and Return to '+data.sender + ' : ' + '{"count" : ' + data.count + ', "timesent" : ' + data.timesent + ', "sender" : "'+data.sender+'"}');
  // console.log(timeNow + "-" + data.timesent);

 // client.publish('/DataOnReturn_'+data.sender, '{"count" : ' + data.count + ', "timesent" : ' + data.timesent + ', "sender" : "'+data.sender+'"}')

})

process.on('SIGINT', function () { console.log("IoT Service Process Terminated.."); process.exit(); });