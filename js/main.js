// main.js: mobile menu, track demo, fill year, adjust topbar spacing
document.addEventListener('DOMContentLoaded', function(){
  // multiple hamburger/mobile menu combos may exist across pages with different IDs
  const hamburgers = document.querySelectorAll('.hamburger');
  hamburgers.forEach(h => {
    const id = h.id;
    // decide mobileMenu id from corresponding pattern (e.g., hamburger => mobileMenu)
    // if page used different ids like hamburger2 -> mobileMenu2, handle both patterns
    h.addEventListener('click', function(){
      // find matching mobileMenu (same numeric suffix) or fallback to first .mobile-menu
      const suffix = id.replace('hamburger','');
      let menu = document.getElementById('mobileMenu' + suffix);
      if(!menu) menu = document.querySelector('.mobile-menu');
      if(!menu) return;
      menu.classList.toggle('open');
      h.classList.toggle('open');
    });
  });

  // close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.mobile-menu').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.hamburger').forEach(h => h.classList.remove('open'));
    });
  });

  // Fill current year in all year spans
  const y = new Date().getFullYear();
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = y);

  // Track demo button(s)
  const trackBtn = document.getElementById('trackBtn');
  if(trackBtn){
    trackBtn.addEventListener('click', function(){
      const val = document.getElementById('orderNumber').value.trim();
      if(!val) return alert('Please enter an order number to track.');
      alert('Order #' + val + '\nStatus: In diagnosis — ETA: 1-2 days');
    });
  }
  const trackBtn2 = document.getElementById('trackBtn2');
  if(trackBtn2){
    trackBtn2.addEventListener('click', function(){
      const val = document.getElementById('orderNumber2').value.trim();
      const result = document.getElementById('trackResult');
      if(!val){
        result.textContent = 'Please enter an order number to track.';
        return;
      }
      // Demo output — replace with API call to get actual status
      result.innerHTML = `<strong>Order #${val}</strong><div style="margin-top:8px;">Status: In diagnosis — ETA: 1–2 days</div>`;
    });
  }

  // adjust CSS var for topbar height at runtime
  const topHeader = document.getElementById('topHeader');
  if(topHeader){
    const h = topHeader.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--topbar-height', h + 'px');
    // adjust hero margin if present
    const hero = document.querySelector('.hero');
    if(hero){
      hero.style.marginTop = `calc(${h}px + 70px)`;
    }
  }
});


(function(){
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  if (!slides || slides.length === 0 || !dots || dots.length === 0 || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    showSlide((currentSlide + 1) % slides.length);
  };

  const prevSlideFn = () => {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds
  slideInterval = setInterval(nextSlide, 5000);

  // Dot click event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.slide));
      resetInterval();
    });
  });

  // Arrow click events
  nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  prevBtn.addEventListener('click', () => { prevSlideFn(); resetInterval(); });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
})();

//this script is for img scrolling
(function(){
  const jarallaxImg = document.querySelector('.section-dark .jarallax-img');
  if (!jarallaxImg) return;
  let latestScrollY = 0;
  let ticking = false;
  window.addEventListener('scroll', () => {
    latestScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const parent = jarallaxImg.parentElement;
        if (!parent) return;
        const sectionOffset = parent.offsetTop;
        const sectionHeight = parent.offsetHeight;
        if (latestScrollY + window.innerHeight > sectionOffset && latestScrollY < sectionOffset + sectionHeight) {
          const relativeY = (latestScrollY - sectionOffset) * 0.4;
          jarallaxImg.style.transform = `translateY(${relativeY}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

//✅ JavaScript for accordion
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const answer = item.nextElementSibling;
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.querySelector('span').textContent = '-';
      } else {
        answer.style.maxHeight = 0;
        item.querySelector('span').textContent = '+';
      }
    });
  });


  //menubar functions 

    AOS.init({ duration: 700, once: true });
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenu = document.getElementById('closeMenu');

  // Open menu
  menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.classList.add('body-no-scroll'); // prevent background scroll
  });

  // Close menu
  closeMenu.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.classList.remove('body-no-scroll');
  });

  // Close if clicked outside menu content
  menuOverlay.addEventListener('click', (e) => {
    if(e.target === menuOverlay){
      menuOverlay.classList.remove('active');
      document.body.classList.remove('body-no-scroll');
    }
  });

  // Submenu toggle
  const toggles = document.querySelectorAll('.submenu-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const submenu = btn.closest('.menu-dropdown').querySelector('.submenu');
      submenu.classList.toggle('open');
      btn.classList.toggle('open'); // rotate arrow
      e.stopPropagation();
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const cursorOuter = document.querySelector('.cursor-outer');

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;
  const speed = 0.15;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Outer circle moves with lag
    outerX += (mouseX - outerX) * speed;
    outerY += (mouseY - outerY) * speed;

    cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;

    requestAnimationFrame(animate);
  }

  animate();
});

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    footerBrand.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


const dropdownBtns = document.querySelectorAll('.dropdown-btn');

dropdownBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const submenu = btn.nextElementSibling;
    submenu.classList.toggle('open');
  });
});

// Skills progress bars: animate on view, one-by-one from 0% to target
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.skills-section');
  if (!skillsSection) return;

  const bars = Array.from(skillsSection.querySelectorAll('.skill-bar .progress'));
  if (bars.length === 0) return;

  // Ensure each bar starts at 0 and has a numeric label element
  bars.forEach(bar => {
    bar.style.width = '0%';
    let percentEl = bar.querySelector('.percent');
    if (!percentEl) {
      percentEl = document.createElement('span');
      percentEl.className = 'percent';
      percentEl.textContent = '0%';
      bar.appendChild(percentEl);
    } else {
      percentEl.textContent = '0%';
    }
  });

  let hasAnimated = false;

  const animateBar = (bar, target, duration = 1200) => new Promise(resolve => {
    const start = performance.now();
    const percentEl = bar.querySelector('.percent');
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      bar.style.width = current + '%';
      if (percentEl) percentEl.textContent = current + '%';
      if (t < 1) requestAnimationFrame(tick); else resolve();
    };
    requestAnimationFrame(tick);
  });

  const animateSequentially = async () => {
    if (hasAnimated) return;
    hasAnimated = true;
    for (const bar of bars) {
      const target = Math.min(100, Math.max(0, parseInt(bar.getAttribute('data-progress') || '100', 10)));
      await animateBar(bar, target, 1200);
      // small gap between bars
      await new Promise(r => setTimeout(r, 200));
    }
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSequentially();
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });

  io.observe(skillsSection);
});

//while clicking on subemnu buttons it should work

// Handle submenu toggle clicks
document.querySelectorAll('.submenu-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const parent = btn.closest('.menu-dropdown');
    const submenu = parent.querySelector('.submenu');
    submenu.classList.toggle('open');
    btn.classList.toggle('open');
  });
});
// Close submenu if clicking outside


  // Get all dropdown toggles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;

      // Close other open dropdowns
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== parent) d.classList.remove('show');
      });

      // Toggle current one
      parent.classList.toggle('show');
    });
  });

  // Close dropdowns when clicking outside
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
    }
  });

