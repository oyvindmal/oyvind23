$(document).ready(function() {
  var currentSlide = 0;
  var totalSlides = $('.slide:not(#end)').length;
  var slideTimer;
  var videoEnded = false;

  // Hide all slides except the first one
  $('.slide').hide();
  $('.slide:first').show();

  // Function to show the current slide and update progress
  function showSlide() {
    $('.slide').hide();
    $('.slide:eq(' + currentSlide + ')').show();

    if (currentSlide < totalSlides) {
      $('#progress').show().text((currentSlide + 1) + '/' + totalSlides);
    } else {
      $('#progress').hide();
    }

    // Clear previous timer (if any)
    clearTimeout(slideTimer);

    // Start timer for automatic slide change (except for the last slide or when video is playing)
    if (currentSlide < totalSlides && !videoEnded) {
      slideTimer = setTimeout(nextSlide, 7000);
    }

    // Restart video if slide contains a video
    var slideVideo = $('.slide:eq(' + currentSlide + ') .slide-video');
    if (slideVideo.length > 0) {
      slideVideo[0].currentTime = 0;
      slideVideo[0].play();
      videoEnded = false;

      // Change slide when video ends
      slideVideo[0].onended = function() {
        videoEnded = true;
        nextSlide();
      };
    }
  }

  // Function to go to the next slide
  function nextSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) {
      currentSlide = 0;
    }
    showSlide();
  }

  // Next button click event
  $('#nextButton').click(nextSlide);

  // Previous button click event
  $('#prevButton').click(function() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = totalSlides;
    }
    showSlide();
  });

  // Reset button click event
  $('#reset').click(function() {
    currentSlide = 0;
    showSlide();
  });

  // Initial progress display
  $('#progress').text((currentSlide + 1) + '/' + totalSlides);

  // Show end slide when reaching the last slide
  $('.slide:last').on('show', function() {
    $('#nextButton').prop('disabled', true);
    clearTimeout(slideTimer); // Clear the timer for the last slide
    $('#progress').hide();
  });

  // Start the timer for automatic slide change (except for the last slide or when video is playing)
  if (currentSlide < totalSlides && !videoEnded) {
    slideTimer = setTimeout(nextSlide, 7000);
  }

  // Start video from the beginning when shown
  $('.slide-video').on('show', function() {
    this.currentTime = 0;
    this.play();
  });
});
