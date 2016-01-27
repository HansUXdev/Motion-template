$(document).foundation();

(function ($) {
  "use strict";
  function onScrollAnimations() {
    $('.wp-1').waypoint(function() {
      $('.wp-1').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
  }

  function htmlVideo() {
    videojs("demo_video", {
      controlBar: {
        timeDivider: false,
        fullscreenToggle: false,
        playToggle: false,
        remainingTimeDisplay: false
      },
      "height": "auto",
      "width": "auto"
    }).ready(function() {
      var myPlayer = this;
      var aspectRatio = 5 / 12; // aspect ratio 12:5 (video frame 960x400)
      function resizeVideoJS() {
          var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
          myPlayer.width(width).height(width * aspectRatio);
      }
      resizeVideoJS();
      window.onresize = resizeVideoJS;
    });
  }

  function init() {
    onScrollAnimations();
    htmlVideo();
  }

  init();

})(jQuery);
