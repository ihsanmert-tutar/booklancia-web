// Enhanced Ethereal Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulse = Math.random() * 0.05;
        this.pulseDir = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse opacity
        this.opacity += this.pulse * this.pulseDir;
        if (this.opacity > 0.6 || this.opacity < 0.1) this.pulseDir *= -1;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(125, 107, 255, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Parallax effect for Screenshot Section
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    const floats = document.querySelectorAll('.screenshot-float');

    floats.forEach((el, index) => {
        const speed = (index + 1) * 0.1;
        // Check if on desktop
        if (window.innerWidth > 991) {
            el.style.transform = `translateY(${scrollPos * speed * 0.5}px)`;
        } else {
            el.style.transform = 'none';
        }
    });
});

// Interactive symbols follow mouse slightly
document.addEventListener('mousemove', (e) => {
    const symbols = document.querySelectorAll('.symbol');
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    symbols.forEach((s, i) => {
        const factor = (i + 1) * 20;
        s.style.marginLeft = `${x * factor}px`;
        s.style.marginTop = `${y * factor}px`;
    });
});
