$(document).ready(function() {
    var timeout; // variable to hold the timeout ID
  
    // Function to increase opacity
    function increaseOpacity() {
      $('#dot').css('opacity', 1);
    }
  
    // Function to reset opacity
    function resetOpacity() {
      $('#dot').css('opacity', 0.5);
    }
  
    // Event handler for scroll start
    $(window).on('scroll', function() {
      clearTimeout(timeout); // clear any previous timeout
      increaseOpacity(); // increase opacity immediately
      timeout = setTimeout(resetOpacity, 500); // reset opacity after 500ms of no scrolling
    });
  });
  