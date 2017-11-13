
var devices = [];
$('#result').hide();
$('#top1').hide();
$('#top2').hide();
$('#top3').hide();
$('#top4').hide();
$('#top5').hide();
var values = [];


// IOT client
var client = require('ibmiotf');
var appClientConfig = {
  org : '',
  id : 'myapp',
  "auth-key" : '',
  "auth-token" : ''
}
var appClient = new client.IotfApplication(appClientConfig);


appClient.on("connect", function () {

  console.log("connected to watson IoT");
  
  appClient.subscribeToDeviceStatus("iotphone");
});
appClient.on("deviceStatus", function (deviceType, deviceId, payload, topic) {

  console.log("Device status from :: "+deviceType+" : "+deviceId+" with payload : "+payload);
  var mess = JSON.parse(payload);
  if (mess.Action =="Connect"){
    if(!document.getElementById('device_'+deviceId)){

      var device = document.createElement("div");
      device.setAttribute("id","device_"+deviceId);
      $(device).addClass('col-md-3');

      output.appendChild(device);

      var device_title = document.createElement("div");
      device_title.setAttribute("id","device_title_"+deviceId);
      $(device_title).addClass('col-md-12');
      $(device_title).addClass('circle-title');
      device_title.innerHTML=deviceId;
      device.appendChild(device_title);

      var device_accel = document.createElement("div");
      device_accel.setAttribute("id","device_accel_"+deviceId);
      $(device_accel).addClass('col-md-12');
      $(device_accel).addClass('circle-accel');
      device.appendChild(device_accel);
    }
    appClient.subscribeToDeviceEvents("iotphone", deviceId);
  }

});
appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

  console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
  var value = JSON.parse(payload);
  var x = Math.abs(value.d.ax);
  var y = Math.abs(value.d.ay);
  var z = Math.abs(value.d.az);
  var moy = ( x+ y + z)/3;
  document.getElementById('device_accel_' + deviceId).innerHTML = moy.toFixed(2);
  var index = devices.indexOf(deviceId);
  if(index == -1){
    devices.push(deviceId);
    values.push([deviceId, [moy.toFixed(2)]]);
  
  } else {
    

    values[index][1].push(moy.toFixed(2));
  }

});
function calcMoy(){
  var listMoy =[];
  for (var d in values){

    var moy = 0;
    for (var i in values[d][1]){
      moy = moy+parseFloat(values[d][1][i]);
    }
    var l = values[d][1].length;
    moy = parseFloat(moy);
    moy = parseFloat((moy / l).toFixed(2));
    console.log(moy, values[d][0])
    listMoy.push([values[d][0], moy]);
  }
  return listMoy;
  
}


document.getElementById("stopbtn").onclick = function () { 
  console.log("STOP to connect ");
  console.log(values);
  appClient.disconnect();

  $('#result').show();
  $('#top1').show();
  $('#top2').show();
  $('#top3').show();
  $('#top4').show();
  $('#top5').show();
};
document.getElementById("startbtn").onclick = function () { 
  console.log("START to connect ");
  $('#result').hide();
  $('#top1').hide();
  $('#top2').hide();
  $('#top3').hide();
  $('#top4').hide();
  $('#top5').hide();
  appClient.connect();
};  





