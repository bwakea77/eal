document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2');
            header.classList.remove('py-3');
        } else {
            header.classList.add('py-3');
            header.classList.remove('py-2');
        }
    });
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.remove('translate-x-full'); });
    closeMobileMenuButton.addEventListener('click', () => { mobileMenu.classList.add('translate-x-full'); });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('translate-x-full')) {
                mobileMenu.classList.add('translate-x-full');
            }
        });
    });
    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.6 });
    sections.forEach(section => { mainObserver.observe(section); });

    const sliderTrack = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.advantage-slide');
    const dotsContainer = document.getElementById('slider-dots');
    let currentIndex = 0;
    let slideInterval;

    function createDots() {
        if (!dotsContainer) return;
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot', 'w-3', 'h-3', 'bg-purple-300', 'rounded-full');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentIndex);
        }
    }

    function goToSlide(index) {
        if (!sliderTrack) return;
        currentIndex = index;
        const offset = -index * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    function startInterval() {
        slideInterval = setInterval(nextSlide, 7000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    if (sliderTrack && slides.length > 0) {
        createDots();
        goToSlide(0);
        startInterval();
    }

    const accordionItems = document.querySelectorAll('.accordion-item');
    const serviceImage = document.getElementById('service-image');
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');

        button.addEventListener('click', () => {
            const isActive = button.classList.contains('active');
            const imageSrc = button.dataset.image;
            
            document.querySelectorAll('.accordion-button').forEach(btn => {
                btn.classList.remove('active');
                btn.querySelector('.accordion-icon').classList.remove('fa-minus');
                btn.querySelector('.accordion-icon').classList.add('fa-plus');
            });
             document.querySelectorAll('.accordion-content').forEach(cont => {
                cont.style.maxHeight = null;
            });

            if (!isActive) {
                button.classList.add('active');
                icon.classList.add('fa-minus');
                icon.classList.remove('fa-plus');
                content.style.maxHeight = content.scrollHeight + "px";
                if (serviceImage && imageSrc) {
                   serviceImage.style.opacity = 0;
                   setTimeout(() => {
                       serviceImage.src = imageSrc;
                       serviceImage.style.opacity = 1;
                   }, 300);
                }
            }
        });
    });
});
