// Back to top button functionality

const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    // Show/hide button based on scroll position (appears after scrolling 50% down)
    window.addEventListener('scroll', () => {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const halfwayPoint = pageHeight / 2;

        if (window.scrollY > halfwayPoint) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
