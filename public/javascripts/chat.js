"use strict";
window.onload = function(){
  var messages = [];
  var socket = io.connect('http://localhost:3000/');
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');

  socket.on('message', function(data){

    if (data.message){
      console.log(data.message);
      console.log(data.username, "USER NAME");
      messages.push(data.message);
      var html = "";
      for (var i = 0; i < messages.length; i++){
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i] + '<br />';
      }
      content.innerHTML = html;
      content.scrollTop = content.scrollHeight;
    }else{
      console.log("there is a problem ", data);
    }
  })

  function sendMessage(){
    var text = field.value;
    socket.emit('send',{message:text});
  }
  sendButton.onclick = function(){
    if (name.value === ""){
      alert("Please type your name");
    }else{
    sendMessage();
  };
}
  field.addEventListener('keypress', function(event){
    event.stopPropagation();

    if(event.keyCode === 13 && !event.shiftKey){
      event.preventDefault();
      sendMessage();

    }
  })

}
