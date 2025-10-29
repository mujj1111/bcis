// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in-up elements
const fadeInElements = document.querySelectorAll('.fade-in-up');
fadeInElements.forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for empty anchors
    if (href === '#') {
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Product card click effects
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Only trigger if not clicking on the "Learn More" link
    if (!e.target.classList.contains('product-card__link')) {
      const link = card.querySelector('.product-card__link');
      if (link) {
        link.click();
      }
    }
  });
});

// Add animation delays to product cards
productCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Initialize fade-in animations
window.addEventListener('load', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
    }, index * 100);
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInsideNav = navMenu.contains(e.target);
  const isClickOnToggle = navToggle.contains(e.target);
  
  if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Prevent body scroll when mobile menu is open
const body = document.body;
const navMenuObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
});

if (navMenu) {
  navMenuObserver.observe(navMenu, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// Contact Form Submission with Confetti
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');
    
    // Create confetti effect
    createConfetti();
    
    // Reset form after 5 seconds
    setTimeout(() => {
      contactForm.style.display = 'flex';
      formSuccess.classList.remove('active');
      contactForm.reset();
    }, 5000);
  });
}

// Confetti Animation
function createConfetti() {
  const colors = ['#4F46E5', '#7C3AED', '#F093FB', '#4FACFE', '#FA709A', '#FEE140'];
  const confettiCount = 50;
  const formCard = document.querySelector('.contact-form-card');
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    // Random shapes
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = '50%';
    }
    
    formCard.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
  });
});

// Smooth scroll offset for fixed header
const scrollToElement = (element) => {
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Enhanced product card interactions
const productCardsEnhanced = document.querySelectorAll('.product-card');
productCardsEnhanced.forEach((card, index) => {
  // Add staggered animation on scroll
  card.style.transitionDelay = `${index * 0.1}s`;
  
  // Add ripple effect on click
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Bot animation trigger on scroll
const botAnimation = document.querySelector('.bot-animation');
if (botAnimation) {
  const observerBot = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        botAnimation.style.animation = 'botFloat 3s ease-in-out infinite';
      }
    });
  }, { threshold: 0.3 });
  
  observerBot.observe(botAnimation);
}

// Animate trust logos on scroll
const trustLogos = document.querySelectorAll('.trust-logo');
if (trustLogos.length > 0) {
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        trustObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  trustLogos.forEach(logo => trustObserver.observe(logo));
}

// Quick action hover effects
const quickActions = document.querySelectorAll('.quick-action');
quickActions.forEach(action => {
  action.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.quick-action__icon');
    icon.style.transform = 'scale(1.1) rotate(5deg)';
  });
  
  action.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.quick-action__icon');
    icon.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Add transition styles for quick action icons
const quickActionIcons = document.querySelectorAll('.quick-action__icon');
quickActionIcons.forEach(icon => {
  icon.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
});