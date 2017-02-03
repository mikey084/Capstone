"use strict";

window.onload = function (){

var eventJson;

fetch('http://localhost:3000/api/events', {method: 'get'}).then(function(data) {
    data.json().then(function(data2) {
        eventJson = data2;
        console.log(data2);
    eventJson.forEach(function(elem){
      var event = new Event(elem)
      event.render();
    })
    })
}).catch(function(err) {
    console.log(err);
})







}
