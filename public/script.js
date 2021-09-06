var canvas = document.getElementById("paint");
var ctx = canvas.getContext("2d");
resize();


function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}


var pos = { x: 0, y: 0 };


function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function draw(e) {
  if (e.buttons !== 1) return; 

  let color = document.getElementById('color_hexa').value;
  let brush = document.getElementById('brush').value;
  ctx.beginPath(); 

  ctx.lineWidth = 20; 
  ctx.lineCap = "round"; 
  ctx.strokeStyle = color; 
  ctx.lineWidth = brush;

  ctx.moveTo(pos.x, pos.y); 
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); 

  ctx.stroke(); 
}



window.addEventListener("resize", resize);


document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);



function delet()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}




function DownloadCanvasAsImage(){
 
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'Desen.png');
  let canvas = document.getElementById('paint');
  let dataURL = canvas.toDataURL('image/png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
  downloadLink.setAttribute('href', url);
  downloadLink.click();
}

function mouseDown() {
  document.getElementById("myP").style.color = "blue";
}

function mouseUp() {
  document.getElementById("myP").style.color = "green";
}




function incarcaPersoane(){
  var xmlhttp = new XMLHttpRequest();  
  console.log("step1 ");
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
         console.log("step2 ");
         var myXml = this.responseText;
         console.log(myXml);
         myFunction(myXml);
      }
  };
  
  xmlhttp.open("GET", "persoane", true);
  xmlhttp.send();
}


//pentru partea de galerie
var slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}


function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

