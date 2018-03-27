//slide show baby
var images = ['/pictures/square-wars.png', '/pictures/pythontictac.png', '/pictures/calcjava.png'];
var bio = ["Square Wars!", "Tic-tac-toe!", "multipurpose-calculator!"];
var slides = document.createElement('div');
  slides.className = "slides";
var slideIndex = 0;
nextSlide();
function nextSlide() {
  slideIndex += 1;;
  if(slideIndex >= images.length) {slideIndex = 0;}
  for(var i = 0; i < images.length; i++) {
    slides.innerHTML = '<img src=' + images[slideIndex] + ' style="width:625px;height:400px;padding:20px;border:1px solid black;background-color:white;"><br><span>' + bio[slideIndex] + '</span>';
  }
  document.getElementById("head-project").appendChild(slides)
}
setInterval(nextSlide, 4000);
