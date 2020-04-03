var request = require('request');

var timeNow;
var count = 0;
var sender = "IoTSensor01"

var sendMessage = setInterval(()=>{

  timeNow = new Date().getTime();
request.post(
  {
    url: 'http://210.102.181.221:8080',
    form: { Temperature : 32, Humidity : 40, AmpSound : 2152, Dust : 21.5214, LightProximity : 25124.52, count : count ,timesent : timeNow, sender : sender}
  },
  function (err, httpResponse, body) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message Sent at : " + timeNow);
      console.log("\ndata Arrived at : " + body);
      count ++;
    }
  })
if(count>100000){
  clearInterval(sendMessage);
}
}, 10) 