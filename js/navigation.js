// Navigation functionality

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLeft = document.querySelector('.nav-left');

if (menuToggle && navLeft) {
    menuToggle.addEventListener('click', () => {
        const isActive = navLeft.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            navLeft.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking a nav link
    navLeft.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLeft.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Copy email to clipboard
const emailLink = document.querySelector('.email-copy');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('ashleyyoon10@gmail.com').then(() => {
            const original = emailLink.getAttribute('aria-label');
            emailLink.setAttribute('aria-label', 'Copied!');
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = 'position:absolute;top:-28px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;font-size:11px;padding:3px 8px;border-radius:3px;white-space:nowrap;pointer-events:none;';
            emailLink.style.position = 'relative';
            emailLink.appendChild(tooltip);
            setTimeout(() => {
                tooltip.remove();
                emailLink.setAttribute('aria-label', original);
            }, 1500);
        });
    });
}

// Inject social icons into mobile nav dropdown
(function () {
    const navList = document.querySelector('.nav-left');
    if (!navList) return;
    const li = document.createElement('li');
    li.className = 'nav-mobile-icons';
    li.innerHTML = `
        <a href="https://www.linkedin.com/in/ashleyyoon10/" target="_blank" rel="noopener" aria-label="LinkedIn" class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
        </a>
        <a href="#" aria-label="Email" class="nav-icon nav-mobile-email">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="2 4 20 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
    `;
    navList.appendChild(li);
    const mobileEmail = li.querySelector('.nav-mobile-email');
    if (mobileEmail) {
        mobileEmail.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('ashleyyoon10@gmail.com').then(() => {
                const orig = mobileEmail.getAttribute('aria-label');
                mobileEmail.setAttribute('aria-label', 'Copied!');
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = 'position:absolute;top:-28px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;font-size:11px;padding:3px 8px;border-radius:3px;white-space:nowrap;pointer-events:none;';
                mobileEmail.style.position = 'relative';
                mobileEmail.appendChild(tooltip);
                setTimeout(() => { tooltip.remove(); mobileEmail.setAttribute('aria-label', orig); }, 1500);
            });
        });
    }
})();

// Highlight active page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-left a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Add scrolled class to header on scroll
const header = document.querySelector('.site-header');
let lastScroll = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}
