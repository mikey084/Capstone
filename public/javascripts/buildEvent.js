"use strict";

window.onload = function (){

var eventJson;
//FILTER HERE
fetch('/api/events', {method: 'get'}).then(function(data) {
    data.json().then(function(data2) {
    console.log(data2, "RLFORLFOFFL");
    // console.log(data2, "DATA 2  ");
    console.log(typeof data2[0].datetime, "I AM THE DATETIME");
    // convertUTCDateToLocalDate(data2[0].datetime, "NIGGABLACK")
    // console.log(convertUTCDateToLocalDate(data2[0].datetime));
    // for (var i = 0; i < data2.length; i++){
    //   console.log(data2[i].datetime);
    //   convertUTCDateToLocalDate(data2[i].datetime);
    // }

    data2.forEach(function(elem){
      console.log(elem, "HAHAHA");
      elem.datetime = new Date(elem.datetime)
      console.log(typeof elem.datetime, "HELOO");
      var event = new Event(elem)
      event.render();
    })
  })
}).catch(function(err) {
    console.log(err);
})

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()-date.getTimezoneOffset*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}

var dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', function(){
  var container = document.getElementById("containerDiv");
  container.innerHTML = ''
  console.log(dropdown.value);
  fetch('/api/events' +"/"+ dropdown.value, {method: 'get'}).then(function(data) {
      data.json().then(function(data2) {
      console.log(data2, "RLFORLFOFFL");
      console.log(typeof data2[0].datetime, "I AM THE DATETIME");


      data2.forEach(function(elem){
        console.log(elem, "HAHAHA");
        elem.datetime = new Date(elem.datetime)
        console.log(typeof elem.datetime, "HELOO");
        var event = new Event(elem)
        event.render();
      })
    })
  }).catch(function(err) {
      console.log(err);
  })
})



}
