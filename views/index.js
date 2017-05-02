var db_size;
//Submit data when enter key is pressed
$('#user_name').keydown(function(e) {
  var name = $('#user_name').val();
  if (e.which == 13 && name.length > 0) { //catch Enter key
    //POST request to API to create a new visitor entry in the database
    $.ajax({
      method: "POST",
      url: "./api/visitors",
      contentType: "application/json",
      data: JSON.stringify({name: name })
    })
    .done(function(data) {
      $('#response').html(data);
      $('#nameInput').hide();
      getNames();
    });
  }
});

//Retreive all the visitors from the database
function getNames(){
  $.get("./api/visitors")
  .done(function(data) {
    if(data.length > 0) {
      $('#databaseNames').html("Database contents: " + JSON.stringify(data));
    }
  });
}

//Retreive db size
function getSize(){
  $.get("/devices")
  .done(function(data) {
    if(data.length > 0) {
      db_size = data.length;

      var output = document.getElementById('output');
      var i=0;
      while(i<db_size)
      {

        if(!document.getElementById('device'+i)){
          var device = document.createElement("div");
          device.setAttribute("id","device"+i);
          $(device).addClass('col-md-3');
          $(device).addClass('circle');
          //$(device).attr("class","circle");
          output.appendChild(device);

          var device_title = document.createElement("div");
          device_title.setAttribute("id","device_title"+i);
          $(device_title).addClass('col-md-12');
          $(device_title).addClass('circle-title');
          device_title.innerHTML=data[i];
          device.appendChild(device_title);

          var accel=10;
          var device_accel = document.createElement("div");
          device_accel.setAttribute("id","device_accel"+i);
          $(device_accel).addClass('col-md-12');
          $(device_accel).addClass('circle-accel');
          device_accel.innerHTML=accel;
          device.appendChild(device_accel);
        }
        i++;
      }
    }
  });
  
}
getSize();
//Call getNames on page load.
//getNames();

// create circle for each device
/*window.onload=function(){
  getSize();
 
  console.log(db_size);
  /*var output = document.getElementById('output');
  var i=1;
  var val="";
  while(i<=3)
  {

    if(!document.getElementById('timedrpact'+i)){
      var ele = document.createElement("div");
      ele.setAttribute("id","timedrpact"+i);
      ele.setAttribute("class","inner");
      ele.innerHTML="hi "+i;
      output.appendChild(ele);
    }
    i++;
  }*/
//};/*/