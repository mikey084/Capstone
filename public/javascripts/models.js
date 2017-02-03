"use strict";

class Event {
  constructor(config){
    this.id = config.id
    this.name = config.name;
    this.occupation = config.occupation
    this.title = config.title
    this.description = config.description
    this.address = config.address;
  }
  render(){
    var body = document.getElementById('body');
    var containerDiv = document.createElement('div')
    containerDiv.setAttribute('class', 'card');
    containerDiv.setAttribute('style', 'width:450px;height:250px')
    var imgTag = document.createElement('img');
    var divImg = document.createElement('div');
    // create card image
    imgTag.setAttribute('class', 'activator');
    imgTag.setAttribute('src', './dawg.jpeg')
    imgTag.setAttribute('style', 'width: 150px; height:100px' )
    divImg.setAttribute('class', 'card-image waves-effect waves-block waves-light');

    divImg.appendChild(imgTag);
    //create card content
    var divContent = document.createElement('div');
    var spanTag = document.createElement('span');
    var iTag = document.createElement('i');
    var pTag = document.createElement('p');
    var aTag = document.createElement('a')
    // sets title
    spanTag.innerHTML = this.name + "   " + this.occupation;

    divContent.setAttribute('class', 'card-content')
    spanTag.setAttribute('class', 'card-title activator grey-text text-darken-4')
    iTag.setAttribute('class', "material-icons right");
    aTag.setAttribute('href', "httpL//localhost/joinEvent");
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
    spanReveal.setAttribute('class', 'card-title grey-text text-darken-4')
    iTagReveal.setAttribute('class', 'material-icons right')

    divCardReveal.appendChild(spanReveal)
    divCardReveal.appendChild(iTagReveal)
    divCardReveal.appendChild(pTagReveal);

    containerDiv.appendChild(divImg);
    containerDiv.appendChild(divContent);
    containerDiv.appendChild(divCardReveal);

    body.appendChild(containerDiv);

    return body;

  }
}
