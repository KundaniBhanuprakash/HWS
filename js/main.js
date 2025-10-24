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


const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

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
prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

//this script is for img scrolling
const jarallaxImg = document.querySelector('.section-dark .jarallax-img');
let latestScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  latestScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const sectionOffset = jarallaxImg.parentElement.offsetTop;
      const sectionHeight = jarallaxImg.parentElement.offsetHeight;

      if (latestScrollY + window.innerHeight > sectionOffset && latestScrollY < sectionOffset + sectionHeight) {
        const relativeY = (latestScrollY - sectionOffset) * 0.4; // slower parallax effect
        jarallaxImg.style.transform = `translateY(${relativeY}px)`;
      }

      ticking = false;
    });

    ticking = true;
  }
});


//button 





//optional for mobile view toggle