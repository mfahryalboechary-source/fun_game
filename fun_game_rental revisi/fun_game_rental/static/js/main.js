/* ========================================
   FUN GAME - RENTAL PLAYSTATION
   Main JavaScript
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('FUN GAME Website Ready! 🎮');
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 26, 50, 0.98)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(15, 26, 50, 0.95)';
            navbar.style.padding = '1rem 0';
        }
    });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
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
    
    // ========================================
    // SMOOTH SCROLL
    // ========================================
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
    
    // ========================================
    // FADE IN ANIMATION ON SCROLL
    // ========================================
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
    
    // Observe all cards
    document.querySelectorAll('.ps-card, .game-card, .pricing-card, .feature').forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // ALERT AUTO CLOSE
    // ========================================
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
    
    // ========================================
    // LOADING EFFECT FOR BUTTONS
    // ========================================
    document.querySelectorAll('.btn-book, .btn-card, .btn-cta, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('no-loading') || this.classList.contains('disabled')) return;
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    });
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #FF6B2C;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // FILTER BUTTONS ANIMATION
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ========================================
    // PREVENT DOUBLE FORM SUBMISSION
    // ========================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        let submitted = false;
        form.addEventListener('submit', function(e) {
            if (submitted) {
                e.preventDefault();
                return false;
            }
            submitted = true;
            setTimeout(() => {
                submitted = false;
            }, 5000);
            return true;
        });
    });
    
    // ========================================
    // DYNAMIC PRICE UPDATE (Detail Page)
    // ========================================
    const durasiSelect = document.getElementById('durasiSelect');
    const totalAmount = document.getElementById('totalAmount');
    
    if (durasiSelect && totalAmount) {
        durasiSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const priceText = selectedOption.text.split('- Rp ');
            if (priceText[1]) {
                totalAmount.textContent = 'Rp ' + priceText[1];
            }
        });
    }
    
    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// ========================================
// ADD FADE-IN CSS
// ========================================
const style = document.createElement('style');
style.textContent = `
    .ps-card, .game-card, .pricing-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .ps-card.fade-in, .game-card.fade-in, .pricing-card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    .back-to-top:hover {
        background: #E55A1B !important;
        transform: translateY(-3px);
    }
    
    .fa-spin {
        animation: fa-spin 1s linear infinite;
    }
    
    @keyframes fa-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
const text = [
    "Rental PS Murah",
    "Main Bareng Teman",
    "Game Lengkap"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type(){

    current = text[i];

    if(!isDeleting){

        document.getElementById("typing")
        .textContent = current.substring(0, j++);

        if(j > current.length){

            isDeleting = true;

            setTimeout(type, 1000);

            return;
        }

    } else {

        document.getElementById("typing")
        .textContent = current.substring(0, j--);

        if(j == 0){

            isDeleting = false;

            i = (i + 1) % text.length;
        }
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();

function bookingWA() {

    Swal.fire({
        title: 'Sebelum Booking',
        html: `
            <div style="text-align:left">
                <p>📌 Siapkan terlebih dahulu:</p>

                <ul style="line-height:1.8;">
                    <li>🪪 KTP / Kartu Pelajar</li>
                    <li>📱 Nomor WhatsApp aktif</li>
                    <li>💰 Pembayaran jika diperlukan</li>
                </ul>

                <p style="margin-top:10px;">
                    Klik <b>Lanjut WhatsApp</b> untuk melanjutkan booking.
                </p>
            </div>
        `,
        icon: 'info',
        background: '#0F1A32',
        color: '#fff',
        confirmButtonColor: '#FF6B2C',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Lanjut WhatsApp',
        cancelButtonText: 'Nanti Dulu',
        showCancelButton: true

    }).then((result) => {

        if(result.isConfirmed){

            window.open(
                'https://wa.me/6281234567890?text=Halo%20FUN%20GAME,%20saya%20ingin%20booking',
                '_blank'
            );

        }

    });

}