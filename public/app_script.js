

$( document ).ready(function() {
    $( "#select_your_fav_title" ).animate({
        marginTop: "+=200",
        opacity: 1.0
      }, 400, function() {});
});


$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
    audioElement.setAttribute('autoPlay', true);
    audioElement.play();
    audioElement.addEventListener("canplay",function(){
        audioElement.play();
    });
});
