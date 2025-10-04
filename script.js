// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing sections');
  
  // Fix for iOS devices
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('ios-device');
    
    // Force repaint on iOS
    setTimeout(function() {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    }, 10);
  }
  
  // Check if profile image loaded correctly
  const profileImg = document.querySelector('.profile-pic');
  if (profileImg) {
    // If the image is already loaded (from cache), it's already visible
    // If it's not, we'll handle any errors
    if (profileImg.complete) {
      console.log('Profile image already loaded from cache');
    } else {
      // Add load event just for logging
      profileImg.onload = function() {
        console.log('Profile image loaded successfully');
      };
    }
    
    // Handle errors by showing fallback image
    profileImg.addEventListener('error', function() {
      console.error('Profile image failed to load');
      // Fallback to the SVG placeholder if image fails to load
      this.src = 'images/default-avatar.svg';
    });
  }
  // Set first section as active initially
  const firstSection = document.querySelector('.first-section');
  const secondSection = document.querySelector('.second-section');
  const techStackContainer = document.querySelector('.tech-stack-container');
  
  // Check if sections exist
  if (!firstSection || !secondSection) {
    console.error('Sections not found:', { firstSection, secondSection });
    return;
  }
  
  let currentSection = 0; // 0 for first section, 1 for second section
  
  // Ensure both sections are properly positioned on load
  firstSection.style.transform = 'translateY(0)';
  secondSection.style.transform = 'translateY(100%)';
  firstSection.classList.add('active');
  
  // Ensure TechStack container is initially hidden
  if (techStackContainer) {
    techStackContainer.classList.remove('animate');
  }
  
  // Function to handle page transitions
  function goToSection(sectionIndex) {
    if (sectionIndex === currentSection) return;
    
    if (sectionIndex === 0) {
      // Go to first section
      firstSection.classList.add('active');
      secondSection.classList.remove('active');
      firstSection.style.transform = 'translateY(0)';
      secondSection.style.transform = 'translateY(100%)';
      
      // Reset animations for when we return to second section later
      const timeline = document.querySelector('.timeline');
      const techStackContainer = document.querySelector('.tech-stack-container');
      
      if (timeline) {
        timeline.classList.remove('animate');
        const timelinePoints = document.querySelectorAll('.timeline-point');
        timelinePoints.forEach(point => {
          point.style.opacity = '0';
          const dot = point.querySelector('.timeline-dot');
          if (dot) dot.classList.remove('animate');
        });
      }
      
      if (techStackContainer) {
        techStackContainer.classList.remove('animate');
      }
      
      currentSection = 0;
    } else {
      // Go to second section
      firstSection.classList.remove('active');
      secondSection.classList.add('active');
      firstSection.style.transform = 'translateY(-100%)';
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
      
      let maxDelay = 0;
      
      timelinePoints.forEach((point) => {
        const position = parseFloat(point.style.left) || 0;
        const animDelay = (position / 100) * lineAnimDuration;
        
        // Keep track of the maximum delay
        if (animDelay > maxDelay) {
          maxDelay = animDelay;
        }
        
        setTimeout(() => {
          point.style.opacity = '1';
          point.querySelector('.timeline-dot').classList.add('animate');
        }, animDelay);
      });
      
      // Start terminal animation immediately when timeline animation begins
      const techStackContainer = document.querySelector('.tech-stack-container');
      if (techStackContainer) {
        techStackContainer.classList.add('animate');
        
        // Start the terminal connection sequence immediately
        const connectionSequence = document.querySelector('.connection-sequence');
        if (connectionSequence) {
          connectionSequence.classList.add('visible');
          
          // Animate the connecting lines sequentially but at a pace matching the timeline
          const connectingLines = document.querySelectorAll('.connecting-line');
          const connectionStepTime = Math.min(maxDelay / connectingLines.length, 700);
          
          connectingLines.forEach((line, index) => {
            setTimeout(() => {
              line.classList.add('visible');
              
              // After all lines are shown, show the tech content
              // This will happen around the same time the timeline finishes
              if (index === connectingLines.length - 1) {
                setTimeout(() => {
                  const techContent = document.querySelector('.tech-content');
                  if (techContent) {
                    techContent.classList.remove('hidden');
                    setTimeout(() => {
                      techContent.classList.add('visible');
                    }, 100);
                  }
                }, connectionStepTime);
              }
            }, connectionStepTime * (index + 1));
          });
        }
      }
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
