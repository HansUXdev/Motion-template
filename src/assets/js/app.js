$(document).foundation();

(function ($) {
  "use strict";
  function onScrollAnimations() {
    $('.wp-1').waypoint(function() {
      $('.wp-1').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
    $('.wp-2').waypoint(function() {
      $('.wp-2').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
    $('.wp-3').waypoint(function() {
      $('.wp-3').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
    $('.wp-4').waypoint(function() {
      $('.wp-4').addClass('animated fadeIn');
    }, {
      offset: '75%'
    });
    $('.wp-5').waypoint(function() {
      $('.wp-5').addClass('animated fadeInRight');
    }, {
      offset: '50%'
    });
    $('.wp-6').waypoint(function() {
      $('.wp-6').addClass('animated fadeInLeft');
    }, {
      offset: '50%'
    });
    $('.wp-7').waypoint(function() {
      $('.wp-7').addClass('animated fadeInUp');
    }, {
      offset: '60%'
    });
    $('.wp-8').waypoint(function() {
      $('.wp-8').addClass('animated fadeInUp');
    }, {
      offset: '60%'
    });
  }
  // Requires flexslider
  function flexsliderPlugin(){
    $('.flexslider').flexslider({
      animation: "slide"
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

  function ctainit(){
    var closeFn;
    function closeShowingModal() {
      var showingModal = document.querySelector('.modal.show');
      if (!showingModal) return;
      showingModal.classList.remove('show');
      document.body.classList.remove('disable-mouse');
      document.body.classList.remove('disable-scroll');
      if (closeFn) {
        closeFn();
        closeFn = null;
      }
    }
    document.addEventListener('click', function (e) {
      var target = e.target;
      if (target.dataset.ctaTarget) {
        closeFn = cta(target, document.querySelector(target.dataset.ctaTarget), { relativeToWindow: true }, function showModal(modal) {
          modal.classList.add('show');
          document.body.classList.add('disable-mouse');
          if(target.dataset.disableScroll){
            document.body.classList.add('disable-scroll');
          }
        });
      }
      else if (target.classList.contains('modal-close-btn')) {
        closeShowingModal();
      }
    });
    document.addEventListener('keyup', function (e) {
      if (e.which === 27) {
        closeShowingModal();
      }
    })
  }

  function init() {
    onScrollAnimations();
    flexsliderPlugin();
    // ctainit();
    // htmlVideo();
  }

  init();

})(jQuery);
