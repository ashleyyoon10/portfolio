// Project page functionality

// Go back to work page and restore scroll position
function goBackToWork() {
    const scrollPos = sessionStorage.getItem('workScrollPosition');

    // Navigate back to work page
    window.location.href = '../work.html';

    // Scroll position will be restored by work page script
}

// PDF Popup functionality
function openPDFPopup() {
    const popup = document.getElementById('pdf-popup');
    const iframe = document.getElementById('pdf-iframe');

    // Set PDF source - adjust the path to your actual PDF
    iframe.src = '../documents/bloomorphosis-presentation.pdf';

    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closePDFPopup() {
    const popup = document.getElementById('pdf-popup');
    const iframe = document.getElementById('pdf-iframe');

    popup.classList.remove('active');
    iframe.src = ''; // Clear iframe source
    document.body.style.overflow = ''; // Restore scrolling
}

// Close PDF popup on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const popup = document.getElementById('pdf-popup');
        if (popup.classList.contains('active')) {
            closePDFPopup();
        }
    }
});

// Close PDF popup when clicking outside the content
document.getElementById('pdf-popup')?.addEventListener('click', (e) => {
    if (e.target.id === 'pdf-popup') {
        closePDFPopup();
    }
});

// Image Lightbox
(function () {
    const lb = document.createElement('div');
    lb.className = 'img-lightbox';
    lb.innerHTML =
        '<button class="img-lightbox-close" aria-label="Close">&times;</button>' +
        '<button class="img-lightbox-prev" aria-label="Previous"></button>' +
        '<img class="img-lightbox-img" src="" alt="">' +
        '<button class="img-lightbox-next" aria-label="Next"></button>';
    document.body.appendChild(lb);

    const lbImg  = lb.querySelector('.img-lightbox-img');
    const lbClose = lb.querySelector('.img-lightbox-close');
    const lbPrev  = lb.querySelector('.img-lightbox-prev');
    const lbNext  = lb.querySelector('.img-lightbox-next');

    let images = [];
    let idx = 0;

    function open(i) {
        idx = i;
        lbImg.src = images[idx].src;
        lbImg.alt = images[idx].alt;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateNav();
    }

    function close() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    function goTo(i) {
        idx = i;
        lbImg.src = images[idx].src;
        lbImg.alt = images[idx].alt;
        updateNav();
    }

    function updateNav() {
        lbPrev.style.visibility = idx > 0 ? 'visible' : 'hidden';
        lbNext.style.visibility = idx < images.length - 1 ? 'visible' : 'hidden';
    }

    document.addEventListener('DOMContentLoaded', () => {
        images = Array.from(document.querySelectorAll('main img')).filter(
            img => !img.closest('.project-carousel')
        );
        images.forEach((img, i) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => open(i));
        });
    });

    lbClose.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    lbPrev.addEventListener('click', () => { if (idx > 0) goTo(idx - 1); });
    lbNext.addEventListener('click', () => { if (idx < images.length - 1) goTo(idx + 1); });

    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft'  && idx > 0) goTo(idx - 1);
        if (e.key === 'ArrowRight' && idx < images.length - 1) goTo(idx + 1);
    });
})();

// Other Projects Carousel navigation
document.querySelectorAll('.project-carousel-wrapper').forEach(wrapper => {
    const carousel = wrapper.querySelector('.project-carousel');
    const prevBtn = wrapper.querySelector('.carousel-btn-prev');
    const nextBtn = wrapper.querySelector('.carousel-btn-next');

    if (!carousel) return;

    prevBtn?.addEventListener('click', () => {
        carousel.scrollBy({ left: -carousel.offsetWidth / 2, behavior: 'smooth' });
    });
    nextBtn?.addEventListener('click', () => {
        carousel.scrollBy({ left: carousel.offsetWidth / 2, behavior: 'smooth' });
    });
});
