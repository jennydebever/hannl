/**
 * Video controls
 */

var x = document.getElementsByClassName("play-pause");
var i;
for (i = 0; i < x.length; i++) {
    x[i].addEventListener("click", function(){
      video = document.getElementById(this.dataset.target);

      if (video.paused == true) { 
        video.play();
        this.classList.remove("paused");
        this.classList.add("playing");
      } else {
        video.pause();
        this.classList.add("paused");
        this.classList.remove("playing");
      }
  });
}