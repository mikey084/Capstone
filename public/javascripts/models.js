"use strict";

// function shave(string){
//   var split = string.split('');
//   split[10] = '';
//   split[11] = ''
//   split[12] = ''
//   var sliced = split.slice(0, 19);
//   var finished = sliced.join("");
//   return finished;
// }
class Event {
  constructor(config){
    this.imageurl = config.imageurl;
    this.id = config.id
    this.name = config.name;
    this.occupation = config.occupation
    this.title = config.title
    this.description = config.description
    this.address = config.address;
    this.time = config.datetime;
  }
  render(){
    // <iframe src="https://appear.in/mikey084" width="800" height="640" frameborder="0"></iframe>
    // var time = shave(this.time);
    var biggestContainerDiv = document.getElementById('containerDiv');
    var containerDiv = document.createElement('div')
    containerDiv.setAttribute('class', 'card');
    containerDiv.setAttribute('style', 'width:365px;height:515px; background-color: white;')




    var imgTag = document.createElement('img');
    var divImg = document.createElement('div');
    var videoBox = document.getElementById('video-box');
    //creating Iframe tag
    // var iFrameTag = document.createElement('iframe');
    // iFrameTag.setAttribute('src', "https://appear/in/mikey084" + "/" + this.id);
    // iFrameTag.setAttribute('style', 'width:800px; height: 640px;');
    // iFrameTag.setAttribute('frameborder', "0");
    // console.log(iFrameTag, "I am i frameTAg");
    // console.log(videoBox, "I am i so boxy");
    //
    // videoBox.appendChild(iFrameTag);

    // create card image
    imgTag.setAttribute('class', 'activator');
    imgTag.setAttribute('src', this.imageurl)
    imgTag.setAttribute('style', 'width: 100%; height:245px' )
    divImg.setAttribute('class', 'card-image waves-effect waves-block waves-light');

    divImg.appendChild(imgTag);
    //create card content
    var divContent = document.createElement('div');
    var spanTag = document.createElement('span');
    var iTag = document.createElement('i');
    var pTag = document.createElement('p');
    var aTag = document.createElement('a')
    // sets title
    spanTag.innerHTML = this.name + "   " + this.occupation + "      Time:  "  + this.time;
    aTag.innerHTML = "Join Event"
    aTag.setAttribute('style', 'font-size: 25px;')
    divContent.setAttribute('class', 'card-content')
    spanTag.setAttribute('class', 'card-title activator grey-text text-darken-4')
    iTag.setAttribute('class', "material-icons right");
    console.log(this.id);
    aTag.setAttribute('href', "events" + "/" + this.id.toString());

    pTag.appendChild(aTag);
    spanTag.appendChild(iTag);
    divContent.appendChild(spanTag)
    divContent.appendChild(pTag);

    //create card Reveal
    var divCardReveal = document.createElement('div');
    var spanReveal = document.createElement('span');
    var iTagReveal = document.createElement('i');
    var pTagReveal = document.createElement('p');
    //sets p content
    pTagReveal.innerHTML = this.description;
    spanReveal.innerHTML = this.title + ":"
    iTagReveal.setAttribute('style', 'width:30px;height30px;')
    divCardReveal.setAttribute('class', 'card-reveal');
    divCardReveal.setAttribute('style', 'background-color: gainsboro;')
    spanReveal.setAttribute('class', 'card-title grey-text text-darken-4')
    iTagReveal.setAttribute('class', 'material-icons right')

    divCardReveal.appendChild(spanReveal)
    divCardReveal.appendChild(iTagReveal)
    divCardReveal.appendChild(pTagReveal);

    containerDiv.appendChild(divImg);
    containerDiv.appendChild(divContent);
    containerDiv.appendChild(divCardReveal);

    biggestContainerDiv.appendChild(containerDiv);

    return biggestContainerDiv;

  }
}
