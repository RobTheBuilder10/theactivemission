// Lightweight Interactive Topography
// Draws sine waves that simulate elevation lines and react to mouse

const canvas = document.getElementById('topo-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let lines = [];
const gap = 40; // Distance between lines
let offset = 0; // Animation tick

// Mouse interaction
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initLines();
}

function initLines() {
    lines = [];
    // Create horizontal lines
    for (let y = 0; y < height + gap; y += gap) {
        lines.push({
            y: y,
            baseY: y,
            amplitude: 15 + Math.random() * 20,
            speed: 0.002 + Math.random() * 0.002,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Subtle white lines
    ctx.lineWidth = 1;

    offset += 0.01;

    lines.forEach(line => {
        ctx.moveTo(0, line.y);

        for (let x = 0; x <= width; x += 20) {
            // Base wave movement
            let y = line.baseY + Math.sin(x * 0.005 + line.phase + offset) * line.amplitude;

            // Mouse interaction (elevation pull)
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            const maxDist = 200;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                // Pull lines down or push up near mouse
                y += force * 40;
            }

            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    targetMouse.x = e.clientX;
    targetMouse.y = e.clientY;
});

// Init
resize();
animate();