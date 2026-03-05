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

    const lbImg   = lb.querySelector('.img-lightbox-img');
    const lbClose = lb.querySelector('.img-lightbox-close');
    const lbPrev  = lb.querySelector('.img-lightbox-prev');
    const lbNext  = lb.querySelector('.img-lightbox-next');

    let images = [];
    let idx = 0;

    // Zoom state
    let scale = 1, panX = 0, panY = 0;

    function clampScale(s) { return Math.min(Math.max(s, 1), 5); }

    function applyTransform() {
        lbImg.style.transform = `scale(${scale}) translate(${panX / scale}px, ${panY / scale}px)`;
        lbImg.style.cursor = scale > 1 ? 'grab' : 'default';
    }

    function resetZoom() {
        scale = 1; panX = 0; panY = 0;
        applyTransform();
    }

    function open(i) {
        idx = i;
        lbImg.src = images[idx].src;
        lbImg.alt = images[idx].alt;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
        resetZoom();
        updateNav();
    }

    function close() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }

    function goTo(i) {
        idx = i;
        lbImg.src = images[idx].src;
        lbImg.alt = images[idx].alt;
        resetZoom();
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

    // Keyboard: arrows, ESC, +/-
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'ArrowLeft'  && idx > 0) { goTo(idx - 1); return; }
        if (e.key === 'ArrowRight' && idx < images.length - 1) { goTo(idx + 1); return; }
        if (e.key === '+' || e.key === '=') { scale = clampScale(scale + 0.25); applyTransform(); }
        if (e.key === '-') { scale = clampScale(scale - 0.25); if (scale === 1) { panX = 0; panY = 0; } applyTransform(); }
    });

    // Trackpad pinch / ctrl+wheel
    lb.addEventListener('wheel', e => {
        if (!lb.classList.contains('active')) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.12 : 0.12;
        scale = clampScale(scale + delta);
        if (scale === 1) { panX = 0; panY = 0; }
        applyTransform();
    }, { passive: false });

    // Touch pinch zoom
    let touchDist = null;
    lb.addEventListener('touchstart', e => {
        if (e.touches.length === 2) {
            touchDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }, { passive: true });

    lb.addEventListener('touchmove', e => {
        if (e.touches.length !== 2 || touchDist === null) return;
        e.preventDefault();
        const newDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        scale = clampScale(scale * (newDist / touchDist));
        touchDist = newDist;
        applyTransform();
    }, { passive: false });

    lb.addEventListener('touchend', e => {
        if (e.touches.length < 2) touchDist = null;
        if (scale < 1.05) { scale = 1; panX = 0; panY = 0; applyTransform(); }
    }, { passive: true });

    // Mouse drag to pan when zoomed
    let isDragging = false, dragStartX, dragStartY, dragStartPanX, dragStartPanY;

    lbImg.addEventListener('mousedown', e => {
        if (scale <= 1) return;
        isDragging = true;
        dragStartX = e.clientX; dragStartY = e.clientY;
        dragStartPanX = panX;   dragStartPanY = panY;
        lbImg.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        panX = dragStartPanX + (e.clientX - dragStartX);
        panY = dragStartPanY + (e.clientY - dragStartY);
        applyTransform();
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        lbImg.style.cursor = scale > 1 ? 'grab' : 'default';
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
