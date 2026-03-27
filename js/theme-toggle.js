// Theme Toggle — pill with sliding circle

// Apply saved theme immediately to prevent flash (before any paint)
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Enable smooth transitions only after the first paint — prevents the
// page background from animating on load when dark mode is restored.
requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add('theme-ready');
}));

document.addEventListener('DOMContentLoaded', () => {
    const navRight = document.querySelector('.nav-right');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileIconsEl = document.querySelector('.nav-mobile-icons');
    if (!navRight) return;

    function createPill() {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle-pill';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        const circle = document.createElement('span');
        circle.className = 'theme-toggle-pill__circle';
        btn.appendChild(circle);
        return btn;
    }

    const desktopBtn = createPill();
    const mobileBtn = mobileIconsEl ? createPill() : null;

    // Insert in nav-right (desktop)
    if (menuToggle) {
        navRight.insertBefore(desktopBtn, menuToggle);
    } else {
        navRight.appendChild(desktopBtn);
    }

    // Insert in mobile dropdown (below icons)
    if (mobileBtn && mobileIconsEl) {
        mobileIconsEl.appendChild(mobileBtn);
    }

    function syncState(theme) {
        [desktopBtn, mobileBtn].filter(Boolean).forEach(btn => {
            btn.classList.toggle('is-dark', theme === 'dark');
            btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    syncState(savedTheme);

    function handleToggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        syncState(next);
    }

    desktopBtn.addEventListener('click', handleToggle);
    if (mobileBtn) mobileBtn.addEventListener('click', handleToggle);
});
