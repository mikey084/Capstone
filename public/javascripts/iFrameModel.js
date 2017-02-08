"use strict";

class iFrame {
  constructor(config){
    this.id = config.id;
  }
  render(){
    var iFrameTag = document.createElement('iframe');
    iFrameTag.setAttribute('src', "https://appear/in/mikey084" + "/" + this.id);
    iFrameTag.setAttribute('style', 'width:800px; height: 640px;');
    iFrameTag.setAttribute('frameborder', "0");
    console.log(iFrameTag, "I am i frameTAg");
    console.log(videoBox, "I am i so boxy");

    videoBox.appendChild(iFrameTag);
  }
}
