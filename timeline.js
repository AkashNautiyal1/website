document.addEventListener('DOMContentLoaded', function() {
  // Set first section as active initially
  const firstSection = document.querySelector('.first-section');
  const secondSection = document.querySelector('.second-section');
  let currentSection = 0; // 0 for first section, 1 for second section
  
  if (firstSection) firstSection.classList.add('active');
  
  // Function to handle page transitions
  function goToSection(sectionIndex) {
    if (sectionIndex === currentSection) return;
    
    if (sectionIndex === 0) {
      // Go to first section
      firstSection.classList.add('active');
      secondSection.style.transform = 'translateY(100%)';
      currentSection = 0;
    } else {
      // Go to second section
      secondSection.classList.add('active');
      secondSection.style.transform = 'translateY(0)';
      
      // Animate timeline after a short delay
      setTimeout(animateTimeline, 500);
      currentSection = 1;
    }
  }
  
  // Function to animate timeline
  function animateTimeline() {
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
  }
  
  // Handle mouse wheel events
  let wheelTimeout = null;
  document.addEventListener('wheel', function(e) {
    if (wheelTimeout !== null) return;
    wheelTimeout = setTimeout(() => wheelTimeout = null, 1000);
    
    if (e.deltaY > 0 && currentSection === 0) {
      // Scroll down, go to second section
      goToSection(1);
    } else if (e.deltaY < 0 && currentSection === 1) {
      // Scroll up, go to first section
      goToSection(0);
    }
  }, { passive: true });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' && currentSection === 0) {
      goToSection(1);
    } else if (e.key === 'ArrowUp' && currentSection === 1) {
      goToSection(0);
    }
  });
  
  // Handle touch events
  let touchStartY = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Detect swipe direction and move to appropriate section
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentSection === 0) {
        // Swipe up, go to second section
        goToSection(1);
      } else if (diff < 0 && currentSection === 1) {
        // Swipe down, go to first section
        goToSection(0);
      }
    }
  }, { passive: true });
  
  // Handle scroll indicator click
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      goToSection(1);
    });
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
