window.onload = function (){

fetch('http://localhost:3000/api/events', {method: 'get'}).then(function(data) {
    data.json().then(function(data2) {
    console.log(data2, "THIS IS THE FETCH RETURNED");


  })
}).catch(function(err) {
    console.log(err);
})



}
