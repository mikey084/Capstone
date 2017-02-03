"use strict";
window.onload = function(){
  var messages = [];
  var socket = io.connect('http://localhost:3000/');
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');
  var userName = document.getElementById('name')
  var html = "";
  var i = 0;
  socket.on('message', function(data){

    if (data.message){
      console.log(data, "data");
      console.log(data.message, "chat js");
      messages.push(data.message);
      html += '<b>' + (data.username ? data.username : 'Server') + ': </b>';
      html += messages[i] + '<br />';
      i++;
      content.innerHTML = html;
      content.scrollTop = content.scrollHeight;
    }else{
      console.log("there is a problem ", data);
    }
  })

  function sendMessage(){
    var user = userName.value;
    var text = field.value;
    socket.emit('send',{message:text, username: user});
    field.value = "";
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
