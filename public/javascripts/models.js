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
    var biggestContainerDiv = document.getElementById('containerDiv');
    
    var containerDiv = document.createElement('div')
    containerDiv.setAttribute('class', 'card');
    containerDiv.setAttribute('style', 'img:hover -webkit-filter: brightness(150%); ')
    containerDiv.setAttribute('style', 'width:365px;height:515px; background-image: url(woodbackground.jpg);')
    var imgTag = document.createElement('img');
    var divImg = document.createElement('div');
    var videoBox = document.getElementById('video-box');

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
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    // sets title
    spanTag.innerHTML = this.name;
    // + "   " + this.occupation + "      Time:  "  + this.time;
    aTag.innerHTML = "Join Event"
    aTag.setAttribute('style', 'font-size: 20px;')
    divContent.setAttribute('class', 'card-content')
    spanTag.setAttribute('class', 'card-title activator grey-text text-darken-4')
    iTag.setAttribute('class', "material-icons right");
    aTag.setAttribute('href', "events" + "/" + this.id.toString());
    li1.setAttribute('style', 'list-style-type: none;')
    li2.setAttribute('style', 'list-style-type: none;')

    li1.innerHTML = this.occupation;
    li2.innerHTML = this.time;

    pTag.appendChild(aTag);
    spanTag.appendChild(li1);
    spanTag.appendChild(li2);
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
    pTagReveal.setAttribute('style', 'font-size:20px;')
    iTagReveal.setAttribute('style', 'width:30px;height30px;')
    divCardReveal.setAttribute('class', 'card-reveal');
    divCardReveal.setAttribute('style', 'background-image: url(woodbackground.jpg);')
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
