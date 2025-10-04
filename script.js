// Smooth scroll polyfill
!function(){function e(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style)){var o=e.HTMLElement||e.Element,s=468,r={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:o.prototype.scroll||n,scrollIntoView:o.prototype.scrollIntoView},i=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,c=function(e){return new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(e)}(e.navigator.userAgent)?1:0;e.scroll=e.scrollTo=function(){if(void 0!==arguments[0]){if(!0===l(arguments[0])){r.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset);return}f.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset)}},e.scrollBy=function(){if(void 0!==arguments[0]){if(l(arguments[0])){r.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:0,void 0!==arguments[0].top?arguments[0].top:0);return}f.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset))}},o.prototype.scroll=o.prototype.scrollTo=function(){if(void 0!==arguments[0]){if(!0===l(arguments[0])){if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");r.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop);return}var e=arguments[0].left,t=arguments[0].top;f.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}},o.prototype.scrollBy=function(){if(void 0!==arguments[0]){if(!0===l(arguments[0])){r.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop);return}this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior})}},o.prototype.scrollIntoView=function(){if(!0===l(arguments[0])){r.scrollIntoView.call(this,void 0===arguments[0]||arguments[0]);return}var o=function(e){for(;e!==t.body&&!1===(s=a(n=e,"Y")&&u(n,"Y"),i=a(n,"X")&&u(n,"X"),s||i);)e=e.parentNode||e.host;var n,o,s,i;return e}(this),n=o.getBoundingClientRect(),s=this.getBoundingClientRect();o!==t.body?(f.call(this,o,o.scrollLeft+s.left-n.left,o.scrollTop+s.top-n.top),"fixed"!==e.getComputedStyle(o).position&&e.scrollBy({left:n.left,top:n.top,behavior:"smooth"})):e.scrollBy({left:s.left,top:s.top,behavior:"smooth"})}}function n(e,t){this.scrollLeft=e,this.scrollTop=t}function l(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function a(e,t){return"Y"===t?e.clientHeight+c<e.scrollHeight:"X"===t?e.clientWidth+c<e.scrollWidth:void 0}function u(e,t){var n=window.getComputedStyle(e,null)["overflow"+t];return"auto"===n||"scroll"===n}function f(e,t,o){var s,r,c,l=(i()-(e.startTime||0))/s;l=l>1?1:l,s=468,r=.5*(1-Math.cos(Math.PI*l)),c=e.startX+(e.x-e.startX)*r,l=e.startY+(e.y-e.startY)*r,e.method.call(e.scrollable,c,l),c===e.x&&l===e.y||window.requestAnimationFrame(f.bind(window,e))}function d(o,c,l){var a,u,d,p,m=i();o===t.body?(a=window,d=window.scrollX||window.pageXOffset,p=window.scrollY||window.pageYOffset,u=r.scroll):(a=o,d=o.scrollLeft,p=o.scrollTop,u=n),f({scrollable:a,method:u,startTime:m,startX:d,startY:p,x:c,y:l})}}"scrollBehavior"in document.documentElement.style&&!0!==window.__forceSmoothScrollPolyfill__||(e())}();

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
    // Ensure image is fully loaded before displaying
    profileImg.style.opacity = '0';
    profileImg.onload = function() {
      // Once loaded, fade it in
      profileImg.style.transition = 'opacity 0.3s ease';
      profileImg.style.opacity = '1';
      console.log('Profile image loaded successfully');
    };
    
    // Force reload the image to bypass cache
    const currentSrc = profileImg.src;
    profileImg.src = '';
    setTimeout(() => {
      profileImg.src = currentSrc + '&t=' + new Date().getTime();
    }, 10);
    
    profileImg.addEventListener('error', function() {
      console.error('Profile image failed to load');
      // Fallback to the SVG placeholder if image fails to load
      this.src = 'images/default-avatar.svg';
      this.style.opacity = '1'; // Show the fallback immediately
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
      
      // Animate the TechStack section after the timeline animation completes
      setTimeout(() => {
        const techStackContainer = document.querySelector('.tech-stack-container');
        if (techStackContainer) {
          techStackContainer.classList.add('animate');
        }
      }, maxDelay + 500); // Add a small buffer after the last point animates
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
