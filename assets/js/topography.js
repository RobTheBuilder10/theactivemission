/**
 * TOPOGRAPHY RENDERER
 * High Performance Canvas 2D
 */

const canvas = document.getElementById('topo-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let lines = [];
let offset = 0;

// Config
const GAP = 50;
const AMPLITUDE_BASE = 20;
const COLOR = 'rgba(198, 166, 109, 0.35)'; // Visible Gold
const LINE_WIDTH = 1.5;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initLines();
}

function initLines() {
    lines = [];
    // Create lines covering the screen
    for (let y = 0; y < height + GAP; y += GAP) {
        lines.push({
            y: y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.002 + Math.random() * 0.003
        });
    }
}

// Mouse Interaction
let mouse = { x: -1000, y: -1000 };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    // Clear with slight transparency hack isn't needed here, just clean wipe
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = LINE_WIDTH;

    lines.forEach(line => {
        ctx.moveTo(0, line.y);

        // Draw segments
        for (let x = 0; x <= width; x += 15) {
            // Base Wave
            let y = line.y + Math.sin(x * 0.005 + line.phase + offset * line.speed) * AMPLITUDE_BASE;

            // Mouse Influence (The "Ripple")
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 200;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                y += force * 40 * Math.sin(dist * 0.1 - offset * 5);
            }

            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    offset += 1; // Animation Tick

    // Accessibility Check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
        requestAnimationFrame(animate);
    }
}

// Init
window.addEventListener('resize', resize);
resize();
animate();