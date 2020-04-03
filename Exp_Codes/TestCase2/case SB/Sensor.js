var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.168:1883')
var qs = require('querystring');
var count = 0;

var sender = "IoTSensor01"

client.on('connect', function () {
  client.subscribe('/DataOnReturn_'+sender, function (err) {
    if (!err) {
      console.log("Subscribe Complete")
    }
  })
  var sendMessage = setInterval(() => {

    timeNow = new Date().getTime();
    client.publish('/Data', '{"count" : ' + count + ', "timesent" : ' + timeNow + ', "sender" : "'+sender+'"}')
    count++;
    if (count > 100000) {
      clearInterval(sendMessage);
      client.end();
      setTimeout(() => {
        process.exit();
      }, 100);
    }
  }, 10)
})

client.on('message', function (topic, message) {
  timeNow = new Date().getTime();

  var data = JSON.parse(message.toString());

  console.log('Message Arrived from '+data.sender +' and Return to '+data.sender + ' : ' + '{"count" : ' + data.count + ', "timesent" : ' + data.timesent + ', "sender" : "'+data.sender+'"}');
  // console.log(timeNow + "-" + data.timesent);
  console.log(data.sender + "has Time Easped Try "+ data.count +" in : "+ (data.timesent - timeNow) +"("+ data.timesent+"-"+timeNow+")");


})




process.on('SIGINT', function () { console.log("IoT Sensor Process Terminated.."); process.exit(); });