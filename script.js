document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navbar ---
  const header = document.getElementById('header');
  const batchStrip = document.querySelector('.batch-strip');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('section');
  
  // Add reveal class to sections
  revealElements.forEach(el => {
    if (!el.classList.contains('hero')) {
      el.classList.add('reveal');
    }
  });

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    if (el.classList.contains('reveal')) {
      revealOnScroll.observe(el);
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  // A simple mobile menu structure modification for this demo
  mobileBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = '#fff';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  });
  
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });

  // Reset display on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'row';
      navLinks.style.position = 'static';
      navLinks.style.padding = '0';
      navLinks.style.boxShadow = 'none';
      navLinks.style.background = 'transparent';
    } else {
      navLinks.style.display = 'none';
    }
  });

  // --- Smooth Scrolling for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // --- Form Submissions ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your demo is booked. Our counselor will contact you shortly.");
    e.target.reset();
    closeModal();
  };

  document.getElementById('cta-form').addEventListener('submit', handleFormSubmit);
  document.querySelector('.modal-form').addEventListener('submit', handleFormSubmit);

});

// --- Modal Functions ---
const modal = document.getElementById('demo-modal');
const modalCourseSelect = document.getElementById('modal-course-select');

function openModal(courseName = '') {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Pre-select course if provided
  if (courseName && modalCourseSelect) {
    // Check if the option exists
    Array.from(modalCourseSelect.options).forEach(opt => {
      if (opt.value === courseName || opt.text.includes(courseName)) {
        modalCourseSelect.value = opt.value;
      }
    });
  }
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal on click outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
// ============================================================
// MARQUEE SECTION: INFINITE CONTINUOUS SCROLL (NEVER STOPS)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  // Duplicate items for seamless infinite loop
  const items = Array.from(marqueeTrack.children);
  const totalWidth = marqueeTrack.scrollWidth;
  const containerWidth = marqueeTrack.parentElement?.offsetWidth || 0;

  // If the track content is less than 2x container width, duplicate to ensure smooth loop
  if (totalWidth < containerWidth * 1.5) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });
  }

  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // If user prefers reduced motion, still animate but slower
    marqueeTrack.style.animation = 'scrollMarquee 48s linear infinite';
  } else {
    // Normal speed - keeps running forever
    marqueeTrack.style.animation = 'scrollMarquee 24s linear infinite';
  }

  // Ensure GPU acceleration for smoother scroll
  marqueeTrack.style.transform = 'translate3d(0, 0, 0)';
  marqueeTrack.style.willChange = 'transform';
  
  // CRITICAL: Remove any hover pause that might be set by other CSS
  // This ensures marquee NEVER stops
  const marqueeSection = document.querySelector('.marquee-section');
  if (marqueeSection) {
    marqueeSection.style.pointerEvents = 'auto'; // Keep pointer events for hover effects on items
  }

  // Optional: Recalculate on window resize to prevent blank spaces
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentWidth = marqueeTrack.scrollWidth;
      const parentWidth = marqueeTrack.parentElement?.offsetWidth || 0;
      if (currentWidth < parentWidth * 1.5) {
        const existingClones = Array.from(marqueeTrack.children);
        const originalCount = items.length;
        if (existingClones.length < originalCount * 2) {
          items.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeTrack.appendChild(clone);
          });
        }
      }
      // Re-apply animation to ensure smoothness after resize
      marqueeTrack.style.animation = 'none';
      marqueeTrack.offsetHeight; // Force reflow
      if (prefersReducedMotion.matches) {
        marqueeTrack.style.animation = 'scrollMarquee 48s linear infinite';
      } else {
        marqueeTrack.style.animation = 'scrollMarquee 24s linear infinite';
      }
    }, 150);
  });
});
