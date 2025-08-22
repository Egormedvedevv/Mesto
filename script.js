const intro = document.querySelector('.intro');
const text = document.querySelector('.text');
const upperblock = document.querySelector('.upperblock');
const exploreImg = document.querySelector('.explore-img');
const carousel = document.querySelector('.carousel');
const items = Array.from(carousel.querySelectorAll('.carousel-item'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const placesImg = document.querySelector('.places-img');
const carouselSection = document.querySelector('.carousel-section');

const introHeight = window.innerHeight;
let lastScrollY = window.scrollY;
let currentIndex = 0;
const spacing = 320;

let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;
  const scrollingDown = scrollY > lastScrollY;

  if (scrollY <= introHeight) {
    intro.style.position = 'fixed';
    intro.style.top = '0';
    intro.style.left = '0';
    intro.style.width = '100%';
    intro.style.height = '100vh';

    text.style.transform = `translate(-50%, calc(-50% - ${scrollY}px))`;

    const opacity = Math.min(scrollY / introHeight, 1);
    intro.style.setProperty('--light-opacity', opacity);
    upperblock.style.opacity = 1 - opacity;

    exploreImg.style.opacity = 0;
    exploreImg.style.transform = 'translateY(50px)';
  } else {
    intro.style.position = 'relative';
    intro.style.height = '100vh';
    text.style.transform = `translate(-50%, calc(-50% - ${introHeight}px))`;
    intro.style.setProperty('--light-opacity', 1);
    upperblock.style.opacity = 0;

    const fadeStart = introHeight;
    const fadeEnd = introHeight + 300;
    let progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    progress = Math.min(Math.max(progress, 0), 1);

    exploreImg.style.opacity = progress;
    exploreImg.style.transform = `translateY(${50 - 50 * progress}px)`;
  }

  const sectionTop = carouselSection.offsetTop;
  const sectionHeight = carouselSection.offsetHeight;
  const scrollBottom = scrollY + window.innerHeight;

  carouselSection.classList.toggle('visible', scrollBottom > sectionTop + 100);
  placesImg.classList.toggle('visible', scrollBottom > sectionTop + 100 && scrollY < sectionTop + sectionHeight);

  lastScrollY = scrollY;
}

window.addEventListener('DOMContentLoaded', handleScroll);
window.addEventListener('scroll', handleScroll);

function updateCarousel() {
  const total = items.length;

  items.forEach((item) => {
    item.classList.remove('active');
    item.style.transform = 'translateX(-50%) scale(0.8)';
    item.style.opacity = '0';
    item.style.zIndex = '0';
    item.style.filter = 'brightness(0.7)';
  });

  const activeItem = items[currentIndex];
  activeItem.classList.add('active');
  activeItem.style.transform = 'translateX(-50%) scale(1)';
  activeItem.style.zIndex = '10';
  activeItem.style.opacity = '1';
  activeItem.style.filter = 'brightness(1)';

  const leftIndex = (currentIndex - 1 + total) % total;
  items[leftIndex].style.transform = `translateX(calc(-50% - ${spacing}px)) scale(0.9)`;
  items[leftIndex].style.opacity = '1';
  items[leftIndex].style.zIndex = '5';

  const rightIndex = (currentIndex + 1) % total;
  items[rightIndex].style.transform = `translateX(calc(-50% + ${spacing}px)) scale(0.9)`;
  items[rightIndex].style.opacity = '1';
  items[rightIndex].style.zIndex = '5';
}

leftArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

rightArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

updateCarousel();

const servicesImg = document.querySelector('.services-img');
const gallerySlider = document.querySelector('.gallery-slider');
const galleryItems = document.querySelectorAll('.gallery-item');
const rightGalleryArrow = document.querySelector('.right-gallery-arrow');

let galleryIndex = 0;

function handleGalleryScroll() {
  const sectionTop = servicesImg.offsetTop;
  const scrollBottom = window.scrollY + window.innerHeight;

  if (scrollBottom > sectionTop + 100) {
    servicesImg.classList.add('visible');
  } else {
    servicesImg.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleGalleryScroll);


const serviceTexts = [
  "Fine restaurant with cozy atmosphere.Enjoy a carefully curated menu crafted by top chefs, offering both local and international flavors. The warm and inviting design makes it the perfect spot for both casual dinners and special occasions. Whether you come for a quick lunch or a romantic evening, the restaurant ensures an unforgettable dining experience.",
  "Premium golf fields for your leisure. Surrounded by beautiful landscapes, the golf fields provide the ideal environment for both beginners and professionals. Designed with precision, they guarantee a challenging yet enjoyable game. It’s a perfect way to relax, socialize, and spend your day outdoors in style.",
  "Secure and spacious parking area. Our parking area is designed to ensure both safety and convenience for every guest. With plenty of space available, you never have to worry about finding a spot. Monitored and well-lit, it offers peace of mind so you can enjoy your time without concern."
];

const serviceDescription = document.getElementById('service-description');

function updateServiceText(index) {
  serviceDescription.style.opacity = '0';
  setTimeout(() => {
    serviceDescription.textContent = serviceTexts[index];
    serviceDescription.style.opacity = '1';
  }, 300); 
}

rightGalleryArrow.addEventListener('click', () => {
  galleryIndex = (galleryIndex + 1) % galleryItems.length;
  gallerySlider.style.transform = `translateX(-${galleryIndex * 100}%)`;
  updateServiceText(galleryIndex);
});

updateServiceText(0);

const accountBtn = document.querySelector('.right-buttons .btn');
const modal = document.getElementById('account-modal');
const closeModal = modal.querySelector('.close');
const accountForm = document.getElementById('account-form');
const formMessage = document.getElementById('form-message');

accountBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  modal.classList.add('show');
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  }
});

accountForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMessage.textContent = "Success!";
  accountForm.reset();
});

const bookingBtns = document.querySelectorAll('.carousel-item .more-btn');
const bookingModal = document.getElementById('booking-modal');
const bookingClose = bookingModal.querySelector('.close');
const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');

bookingBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    bookingModal.style.display = 'block';
    bookingModal.classList.add('show');
  });
});

bookingClose.addEventListener('click', () => {
  bookingModal.classList.remove('show');
  setTimeout(() => bookingModal.style.display = 'none', 300);
});

window.addEventListener('click', (e) => {
  if (e.target === bookingModal) {
    bookingModal.classList.remove('show');
    setTimeout(() => bookingModal.style.display = 'none', 300);
  }
});

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('booking-date').value;
  bookingMessage.textContent = `Дата ${date} successfully booked!`;
  bookingForm.reset();
});
