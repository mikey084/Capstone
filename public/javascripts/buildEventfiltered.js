"use strict";

window.onload = function (){
var newArray = [];
//FILTER HERE
fetch('http://localhost:3000/api/events', {method: 'get'}).then(function(data) {
    data.json().then(function(data2) {

    data2.filter(function(elem){
      if(filterDate(elem.datetime)){
        newArray.push(elem);
      }
    })
    console.log(newArray, "I AM THE FILTERED ARRAY");

    newArray.forEach(function(elem){
      console.log(elem);
      var event = new Event(elem)
      event.render();
    })
  })
}).catch(function(err) {
    console.log(err);
})




function today(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
}
if(mm<10) {
    mm='0'+mm
}
today = mm+'/'+dd+'/'+yyyy;
return today
}

function filterDate(string){
  var split = string.split('');
  var checkString = split[5].concat(split[6]).concat(split[8]).concat(split[9]);
  var target = today();
  var split2 = target.split('');
  var filterString = split2[0].concat(split2[1]).concat(split2[3]).concat(split2[4]);
  if(checkString != filterString){
    return false;
  }
  return true;
}







}
