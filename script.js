document.addEventListener('scroll', function() {
    var scrollingText = document.getElementById('scrolling-text');
    var scrollingContainer = document.getElementById('scrolling-container');
    var scrollPosition = window.scrollY;

 
    if (scrollPosition > 300) {
      
        scrollingText.style.opacity = 1;
      
    } else {
      
        scrollingText.style.opacity = 0;
      
    }
});
