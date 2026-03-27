// Theme Toggle — pill with sliding circle

// Apply saved theme immediately to prevent flash
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    const navRight = document.querySelector('.nav-right');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!navRight) return;

    // Build pill toggle
    const btn = document.createElement('button');
    btn.className = 'theme-toggle-pill';
    btn.setAttribute('aria-label', 'Toggle dark mode');

    const circle = document.createElement('span');
    circle.className = 'theme-toggle-pill__circle';
    btn.appendChild(circle);

    // Insert before menu-toggle (mobile hamburger) if it exists, else append
    if (menuToggle) {
        navRight.insertBefore(btn, menuToggle);
    } else {
        navRight.appendChild(btn);
    }

    // Sync visual state
    function syncState(theme) {
        btn.classList.toggle('is-dark', theme === 'dark');
        btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    syncState(savedTheme);

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        syncState(next);
    });
});
