// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 26, 50, 0.98)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'rgba(15, 26, 50, 0.95)';
        navbar.style.padding = '1rem 0';
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    }
});

// Smooth Scroll untuk Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animasi Fade In saat Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.ps-card, .game-card, .pricing-card, .feature').forEach(el => {
    observer.observe(el);
});

// Alert Auto Close
setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(() => {
            if (alert.parentNode) alert.remove();
        }, 300);
    });
}, 3000);

// Loading Effect untuk Tombol
document.querySelectorAll('.btn-book, .btn-card, .btn-cta, .btn-primary, .filter-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Skip jika sudah memiliki class no-loading atau disabled
        if (this.classList.contains('no-loading') || this.classList.contains('disabled')) return;
        
        // Hanya untuk tombol yang bukan link biasa
        if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
            e.preventDefault();
        }
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Counter Animation untuk Angka
function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerText = value.toLocaleString('id-ID');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate price numbers when in view
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceElement = entry.target;
            const finalPrice = parseInt(priceElement.getAttribute('data-price')) || 0;
            animateNumber(priceElement, 0, finalPrice, 1000);
            priceObserver.unobserve(priceElement);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.price-value').forEach(el => {
    priceObserver.observe(el);
});

// Add loading class to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: #FF6B2C; color: white; border: none; border-radius: 50%; cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 999; box-shadow: 0 4px 15px rgba(0,0,0,0.2);';

document.body.appendChild(backToTop);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Filter animation for daftar ps
const filterBtns = document.querySelectorAll('.filter-btn');
const psCards = document.querySelectorAll('.ps-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const filter = this.getAttribute('href');
            if (filter && filter !== '#' && !filter.includes('?')) {
                // Handle jika filter tidak menggunakan query parameter
                e.preventDefault();
                const tipe = this.innerText.trim();
                
                filterBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                psCards.forEach(function(card) {
                    if (tipe === 'Semua' || card.getAttribute('data-tipe') === tipe) {
                        card.style.display = 'block';
                        setTimeout(function() {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(function() {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });
}

// Tooltip untuk fitur (optional)
const features = document.querySelectorAll('.feature');
features.forEach(function(feature) {
    const span = feature.querySelector('span');
    if (span) {
        feature.setAttribute('title', span.innerText || '');
    }
});

// Prevent double form submission
const forms = document.querySelectorAll('form');
forms.forEach(function(form) {
    let submitted = false;
    form.addEventListener('submit', function(e) {
        if (submitted) {
            e.preventDefault();
            return false;
        }
        submitted = true;
        setTimeout(function() {
            submitted = false;
        }, 5000);
        return true;
    });
});

// Dynamic price update for detail page
const durasiSelect = document.getElementById('durasiSelect');
const totalAmount = document.getElementById('totalAmount');

if (durasiSelect && totalAmount) {
    // Prices will be set from Django template variables
    durasiSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const priceText = selectedOption.text.split('- Rp ');
        if (priceText[1]) {
            totalAmount.textContent = 'Rp ' + priceText[1];
        }
    });
}

// Tambahkan CSS untuk animasi fade-in
const styleTag = document.createElement('style');
styleTag.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards !important;
    }
    
    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    .ps-card, .game-card, .pricing-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .ps-card.fade-in, .game-card.fade-in, .pricing-card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    .back-to-top:hover {
        background: #E55A1B !important;
        transform: translateY(-3px);
    }
`;
document.head.appendChild(styleTag);

// Log bahwa JS sudah berhasil dimuat
console.log('FUN GAME - Website loaded successfully!');