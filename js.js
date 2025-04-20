// Sélection des éléments DOM
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

// Fonction pour basculer le menu mobile
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

// Fermer le menu lorsqu'on fait défiler la page
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    
    // Ajout de la classe sticky au header lors du défilement
    if(window.scrollY > 60){
        document.querySelector('.header').classList.add('sticky');
    } else {
        document.querySelector('.header').classList.remove('sticky');
    }
    
    // Afficher ou masquer le bouton de retour en haut
    if(window.scrollY > 200){
        document.querySelector('.scroll-top').classList.add('active');
    } else {
        document.querySelector('.scroll-top').classList.remove('active');
    }
}

// Initialisation du slider Swiper pour la section d'accueil
var swiper = new Swiper(".home-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});

// Initialisation du slider Swiper pour la section des avis
var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    spaceBetween: 10,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        700: {
            slidesPerView: 2,
        },
        1050: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    }
});

// Nouvelle implémentation pour la fonctionnalité d'accordéon FAQ
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordion = header.parentElement;
    
    // Toggle active class pour cet accordéon
    accordion.classList.toggle('active');
    
    // Récupérer l'élément de contenu
    const content = accordion.querySelector('.accordion-content');
    
    // Si l'accordéon est actif, définir la hauteur maximale à la hauteur de défilement du contenu
    if (accordion.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + "px";
      header.querySelector('i').classList.remove('fa-plus');
      header.querySelector('i').classList.add('fa-minus');
    } else {
      content.style.maxHeight = 0;
      header.querySelector('i').classList.remove('fa-minus');
      header.querySelector('i').classList.add('fa-plus');
    }
    
    // Fermer les autres accordéons lorsqu'un est ouvert
    document.querySelectorAll('.accordion').forEach(item => {
      if (item !== accordion && item.classList.contains('active')) {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = 0;
        item.querySelector('.accordion-header i').classList.remove('fa-minus');
        item.querySelector('.accordion-header i').classList.add('fa-plus');
      }
    });
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
      // Here you would typically send this to your backend
      alert('Merci pour votre inscription! Vous recevrez nos actualités bientôt.');
      emailInput.value = '';
    }
  });
}

// Contact form submission
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    if (name && email) {
      // Here you would typically send this to your backend
      alert('Merci pour votre message! Nous vous contacterons bientôt.');
      this.reset();
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile menu if open
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    
    // Scroll to target
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // Offset for header
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top button functionality
const scrollTopButton = document.querySelector('.scroll-top');
if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Event card booking buttons
document.querySelectorAll('.event-card .btn-small').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const eventName = this.closest('.event-info').querySelector('h3').textContent;
    alert(`Vous allez réserver pour: ${eventName}. Cette fonctionnalité sera bientôt disponible.`);
  });
});

// Image gallery animation on scroll
const animateOnScroll = () => {
  const boxes = document.querySelectorAll('.box');
  
  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    const triggerBottom = window.innerHeight * 0.8;
    
    if (boxTop < triggerBottom) {
      box.classList.add('show');
    }
  });
};

// Add animation class to CSS
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .box {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }
    .box.show {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`);

// Initialize animations on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Add simple page preloader
document.body.insertAdjacentHTML('afterbegin', `
  <div id="preloader">
    <div class="loader"></div>
  </div>
  <style>
    #preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #121212;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999;
    }
    .loader {
      width: 50px;
      height: 50px;
      border: 5px solid transparent;
      border-top-color: var(--main-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`);

// Remove preloader after page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 500);
});