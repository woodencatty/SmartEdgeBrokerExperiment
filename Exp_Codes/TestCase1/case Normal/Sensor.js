var request = require('request');

var timeNow;
var count = 0;

var sendMessage = setInterval(()=>{

  timeNow = new Date().getTime();
request.post(
  {
    url: 'http://210.102.181.221:8080',
    form: { count : count ,timesent : timeNow, sender : "IoTSensor01"}
  },
  function (err, httpResponse, body) {
    if (err) {
      console.log(err);
    } else {
      timeReturn = new Date().getTime();
      console.log("Time Easped Try "+ count +" : "+ (timeReturn - body) +"("+ timeReturn+"-"+body+")");
      count ++;
    }
  })
if(count>1000){
  clearInterval(sendMessage);
}
}, 100)