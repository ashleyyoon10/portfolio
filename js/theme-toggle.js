// Theme Toggle - Lights On / Lights Off

// Get saved theme from localStorage or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Create and add theme toggle button
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
themeToggle.setAttribute('title', savedTheme === 'dark' ? 'Lights on' : 'Lights off');

// ON label
const onLabel = document.createElement('span');
onLabel.className = 'theme-toggle-on';
onLabel.textContent = 'ON';

// Faceplate + rocker
const plate = document.createElement('span');
plate.className = 'toggle-plate';
const rocker = document.createElement('span');
rocker.className = 'toggle-rocker';
plate.appendChild(rocker);

// OFF label
const offLabel = document.createElement('span');
offLabel.className = 'theme-toggle-off';
offLabel.textContent = 'OFF';

themeToggle.appendChild(onLabel);
themeToggle.appendChild(plate);
themeToggle.appendChild(offLabel);

document.body.appendChild(themeToggle);

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.setAttribute('title', newTheme === 'dark' ? 'Lights on' : 'Lights off');
});
