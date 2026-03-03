// Home page cursor tracker - small light gray circle

const canvas = document.getElementById('ripple-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let mouseX = -100;
    let mouseY = -100;

    // Set canvas size to full window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position globally
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        mouseX = -100;
        mouseY = -100;
    });

    // Animation loop - draw cursor circle
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw light gray circle at cursor position (better contrast)
        if (mouseX >= 0 && mouseY >= 0) {
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(180, 180, 180, 0.5)';
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    animate();
}
