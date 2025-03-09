
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize hero animations
    setTimeout(() => {
      document.getElementById('hero').classList.add('loaded');
    }, 100);
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to initialize
    
    // Populate game lists
    populateGames();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize navigation highlighting
    initNavHighlighting();
  });
  
  // Handle scroll events
  function handleScroll() {
    // Update navbar on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Animate elements when they come into view
    animateOnScroll('.section-header', 'visible');
    animateOnScroll('.game-card', 'visible');
    
    // Update active nav link based on scroll position
    updateActiveNavOnScroll();
  }
  
  // Animate elements when they come into view
  function animateOnScroll(selector, className) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        element.classList.add(className);
      }
    });
  }
  
  // Scroll to section
  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
  
  // Initialize navigation highlighting
  function initNavHighlighting() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
      });
    });
  }
  
  // Update active nav link based on scroll position
  function updateActiveNavOnScroll() {
    const sections = [
      { id: 'hero', navId: 'nav-home' },
      { id: 'games', navId: 'nav-games' },
      { id: 'contact', navId: 'nav-contact' }
    ];
    
    const scrollPosition = window.scrollY + 100; // Add offset to improve detection
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          // Remove active class from all nav links
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to corresponding nav link
          const activeNav = document.getElementById(sections[i].navId);
          if (activeNav) {
            activeNav.classList.add('active');
          }
          
          break;
        }
      }
    }
  }
  
  // Populate games
  function populateGames() {
    const featuredGamesContainer = document.getElementById('featured-games');
    const gamesGridContainer = document.getElementById('games-grid');
    
    // Populate featured games
    getFeaturedGames().forEach(game => {
      featuredGamesContainer.appendChild(createGameCard(game, true));
    });
    
    // Populate all games
    games.forEach(game => {
      gamesGridContainer.appendChild(createGameCard(game));
    });
  }
  
  // Create game card
  function createGameCard(game, featured = false) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.id = `game-${game.id}`;
    
    let html = `
      <div class="game-image" style="aspect-ratio: 1024/500;">
        <img src="${game.screenshots[0].src}" alt="${game.title}" width="1024" height="500" />
        <div class="game-category">${game.category}</div>
      </div>
      <div class="game-content">
        <div class="game-header">
          <div class="game-icon">
            <img src="${game.icon}" alt="${game.title} icon" />
          </div>
          <div class="game-title-desc">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.shortDescription}</p>
          </div>
        </div>
        <div class="game-footer">
          <div class="game-store-links">
            ${game.appStoreUrl ? `
              <a href="${game.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-link">
                <i data-lucide="apple" class="w-3.5 h-3.5"></i>
                <span>App Store</span>
              </a>
            ` : ''}
            ${game.googlePlayUrl ? `
              <a href="${game.googlePlayUrl}" target="_blank" rel="noopener noreferrer" class="store-link">
                <i data-lucide="play" class="w-3.5 h-3.5"></i>
                <span>Google Play</span>
              </a>
            ` : ''}
          </div>
          <a href="#" class="game-details-link" onclick="showGameDetails('${game.id}'); return false;">
            <span>Details</span>
            <i data-lucide="external-link" class="w-3 h-3"></i>
          </a>
        </div>
      </div>
    `;
    
    card.innerHTML = html;
    return card;
  }
  
  // Handle contact form submission
  function initContactFormold() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Show loading state
        submitBtn.querySelector('.btn-text').classList.add('hidden');
        submitBtn.querySelector('.btn-loading').classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
          // Create toast notification
          showToast('Message sent', 'Thank you for your message. We\'ll get back to you soon!');
          
          // Reset form
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
          
          // Reset button state
          submitBtn.querySelector('.btn-text').classList.remove('hidden');
          submitBtn.querySelector('.btn-loading').classList.add('hidden');
          submitBtn.disabled = false;
        }, 1500);
      });
    }
  }

  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Validate form fields
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
          showToast('Error', 'Please fill out all fields', 'error');
          return;
        }
        
        // Show loading state
        submitBtn.querySelector('.btn-text').classList.add('hidden');
        submitBtn.querySelector('.btn-loading').classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Format the message body with sender's name and email
        const subject = `${nameInput.value} Message from Gamefolio`;
        const body = `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`;
        
        // Prepare the mailto URL (replace contact@example.com with your actual email)
        const mailtoURL = `mailto:meukapps@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open the user's email client
        window.location.href = mailtoURL;
        
        // Show success notification
        setTimeout(() => {
          showToast('Email client opened', 'Your email client has been opened with the message details. Please send the email to complete your submission.');
          
          // Reset form
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
          
          // Reset button state
          submitBtn.querySelector('.btn-text').classList.remove('hidden');
          submitBtn.querySelector('.btn-loading').classList.add('hidden');
          submitBtn.disabled = false;
        }, 1000);
      });
    }
  }
  
  // Show toast notification
  function showToast(title, message) {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after animation completes
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }
  
  // Show game details
  function showGameDetails(gameId) {
    const game = games.find(g => g.id === gameId);
    
    if (game) {
      alert(`Game details for ${game.title} would show here. In a full implementation, this would navigate to a detailed page for the game.`);
    }
  }