document.addEventListener('DOMContentLoaded', function() {
  // Animate the timeline once it's in view
  setTimeout(() => {
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      timeline.classList.add('animate');
      
      // Calculate positions and animate dots as the line reaches them
      const timelinePoints = document.querySelectorAll('.timeline-point');
      const lineAnimDuration = 2500; // match the CSS transition duration
      
      timelinePoints.forEach((point) => {
        const position = parseFloat(point.style.left) || 0;
        const animDelay = (position / 100) * lineAnimDuration;
        
        setTimeout(() => {
          point.style.opacity = '1';
          point.querySelector('.timeline-dot').classList.add('animate');
        }, animDelay);
      });
    }
  }, 500);
  
  // Add scroll indicator functionality
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const secondSection = document.querySelector('.second-section');
  const firstSection = document.querySelector('.first-section');
  
  if (scrollIndicator && secondSection) {
    scrollIndicator.addEventListener('click', function() {
      secondSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Handle both wheel and touch events for better cross-device compatibility
    const handleScroll = function() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // If near the transition point, snap to the appropriate section
      if (scrollPosition > windowHeight * 0.2 && scrollPosition < windowHeight * 0.8) {
        secondSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (scrollPosition < windowHeight * 0.2) {
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    
    // Throttle scroll events to improve performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
          handleScroll();
          scrollTimeout = null;
        }, 100);
      }
    }, { passive: true });
    
    // Add wheel event listener
    document.addEventListener('wheel', handleScroll, { passive: true });
    
    // Add touch event listeners for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Detect swipe direction and scroll to appropriate section
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) { // Swipe up
          secondSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else { // Swipe down
          firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, { passive: true });
  }
  
  // Add hover effect for timeline points
  const timelinePoints = document.querySelectorAll('.timeline-point');
  timelinePoints.forEach(point => {
    point.addEventListener('mouseenter', function() {
      const tooltip = this.querySelector('.timeline-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
      }
    });
    
    point.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.timeline-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
      }
    });
  });
});