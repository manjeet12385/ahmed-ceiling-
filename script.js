// ==========================================================================
// AHMED CEILING / DREAM CEILING - INTERACTIVE SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // Ensure Background Video Autoplay
  const heroVideo = document.querySelector('.hero-bg-video');
  if (heroVideo) {
    heroVideo.play().catch(err => {
      console.log('Video play policy fallback:', err);
    });
  }

  // 1. Sticky Navbar & Active Link Highlight
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('show')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Modal Popup Logic
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const quoteBtns = document.querySelectorAll('.open-quote-btn');
  const bookingBtns = document.querySelectorAll('.open-booking-btn');

  function openModal() {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  quoteBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  bookingBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // 4. Form Submit Handler
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const form = document.getElementById('quoteForm');
    const successMsg = document.getElementById('formSuccess');

    if (form && successMsg) {
      form.style.display = 'none';
      successMsg.style.display = 'block';

      setTimeout(() => {
        closeModal();
        // Reset form for next time
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successMsg.style.display = 'none';
        }, 500);
      }, 2500);
    }
  };

  // 5. Stats Animated Counter on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateStats() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const targetStr = stat.getAttribute('data-target');
        if (!targetStr) return;
        const target = parseInt(targetStr);
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            stat.innerText = Math.ceil(count) + '+';
            setTimeout(updateCount, 30);
          } else {
            stat.innerText = target + '+';
          }
        };
        updateCount();
      });
    }
  }

  // 6. Portfolio Category Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioItems = document.querySelectorAll('.portfolio-item-card');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. Language Switcher (English / Hindi)
  const translations = {
    en: {
      nav_home: "HOME",
      nav_services: "SERVICES",
      nav_portfolio: "PORTFOLIO",
      nav_videos: "VIDEOS",
      nav_gallery: "GALLERY",
      nav_about: "ABOUT",
      nav_contact: "CONTACT",
      get_quote: "Get a Quote",
      hero_badge: "LUXURY CEILING INSTALLATION",
      hero_title: "Luxury False Ceiling <br><span class=\"hero-title-highlight\">& Profile Lighting Installation</span>",
      hero_desc: "Premium Gypsum, POP & Wooden Ceiling Solutions with Modern Lighting Integration.",
      book_now: "Book Service Now",
      explore_portfolio: "Explore Portfolio",
      stat_exp: "YEARS EXPERIENCE",
      stat_proj: "PROJECTS COMPLETED",
      stat_clients: "HAPPY CLIENTS",
      stat_support: "SUPPORT",
      services_title: "Our Architectural Services",
      services_sub: "Specialized ceiling systems engineered for acoustic precision and curated visual grandeur. We transform standard overhead planes into dynamic architectural features with unparalleled craftsmanship."
    },
    hi: {
      nav_home: "होम",
      nav_services: "सेवाएं",
      nav_portfolio: "पोर्टफोलियो",
      nav_videos: "वीडियोज़",
      nav_gallery: "गैलरी",
      nav_about: "हमारे बारे में",
      nav_contact: "संपर्क",
      get_quote: "कोटेशन पाएं",
      hero_badge: "लक्ज़री फॉल्स सीलिंग इंस्टॉलेशन",
      hero_title: "लक्ज़री फॉल्स सीलिंग <br><span class=\"hero-title-highlight\">एवं प्रोफाइल लाइटिंग इंस्टॉलेशन</span>",
      hero_desc: "प्रीमियम जिप्सम, POP और वुडन फॉल्स सीलिंग की बेहतरीन इंस्टॉलेशन सेवाएं।",
      book_now: "अभी सर्विस बुक करें",
      explore_portfolio: "पोर्टफोलियो देखें",
      stat_exp: "वर्षों का अनुभव",
      stat_proj: "प्रोजेक्ट्स पूर्ण",
      stat_clients: "संतुष्ट ग्राहक",
      stat_support: "24/7 सहायता",
      services_title: "हमारी आर्किटेक्चरल सेवाएं",
      services_sub: "सटीक एकाउस्टिक और विजुअल सुंदरता के लिए विशेष सीलिंग सिस्टम। हम साधारण छतों को आधुनिक आर्किटेक्चरल कलाकृतियों में बदलते हैं।"
    }
  };

  const langBtns = document.querySelectorAll('.lang-btn');

  function setLanguage(lang) {
    if (!translations[lang]) return;
    
    // Toggle active button
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update text content of data-i18n elements
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(elem => {
      const key = elem.getAttribute('data-i18n');
      if (translations[lang][key]) {
        elem.innerHTML = translations[lang][key];
      }
    });

    localStorage.setItem('preferred_lang', lang);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Restore preferred language on load
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);

});

