// Gallery filtering and scroll position preservation

// Only run if we're on the work page
if (document.querySelector('.gallery-grid')) {

    // ============================================
    // SCROLL POSITION RESTORATION
    // ============================================

    // Restore scroll position when returning to work page
    window.addEventListener('load', () => {
        const savedScrollPos = sessionStorage.getItem('workScrollPosition');
        if (savedScrollPos) {
            window.scrollTo(0, parseInt(savedScrollPos));
            sessionStorage.removeItem('workScrollPosition');
        }
    });

    // ============================================
    // DROPDOWN FILTER FUNCTIONALITY
    // ============================================

    const filterDropdown = document.getElementById('category-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterDropdown && projectCards.length > 0) {
        filterDropdown.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            filterProjects(selectedCategory);
        });
    }

    function filterProjects(category) {
        projectCards.forEach((card, index) => {
            const cardCategories = card.dataset.category.split(' ');

            if (category === 'all' || cardCategories.includes(category)) {
                // Show card with staggered animation
                card.classList.remove('hidden');
                card.style.animationDelay = `${index * 0.05}s`;
            } else {
                // Hide card
                card.classList.add('hidden');
            }
        });
    }

    // ============================================
    // PROJECT PAGE NAVIGATION
    // ============================================

    // Navigate to project page when clicking a project card
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Save current scroll position
            sessionStorage.setItem('workScrollPosition', window.scrollY);

            // Get project slug from card (you can add data-slug attribute)
            const title = card.dataset.title;
            const projectSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            // Navigate to project page
            window.location.href = `projects/${projectSlug}.html`;
        });

        // Add keyboard support for project cards
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}
