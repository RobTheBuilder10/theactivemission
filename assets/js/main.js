/* THE ACTIVE MISSION - SYSTEM CORE
    Includes: Router, Loader, HUD Logic, Data Renderers
*/

// --- CONFIGURATION & STATE ---
const app = {
    currentPage: 'home',
    startTime: Date.now(),
    coords: null
};

// --- CONTENT TEMPLATES (SPA) ---
const templates = {
    home: `
        <section class="hero-block">
            <h1 class="display-title">THE ACTIVE<br>MISSION</h1>
            <p class="hero-subtitle">LIVE LIFE ON PURPOSE.</p>
            <div class="cta-group">
                <button class="btn-gold" onclick="app.router('coaching')">JOIN THE MISSION</button>
                <button class="btn-outline" onclick="app.router('programs')">BROWSE PROGRAMS</button>
            </div>
        </section>

        <section class="grid-system">
            <div class="card" onclick="app.router('philosophy')">
                <span class="card-tag">01 // ETHOS</span>
                <h3>PHILOSOPHY</h3>
                <p>We build durable humans through faith, fitness, and discipline.</p>
            </div>
            <div class="card" onclick="app.router('podcast')">
                <span class="card-tag">02 // INTEL</span>
                <h3>PODCAST</h3>
                <p>Tactical conversations on performance and culture.</p>
            </div>
            <div class="card" onclick="app.router('events')">
                <span class="card-tag">03 // DEPLOYMENT</span>
                <h3>EVENTS</h3>
                <p>Kickoff Weekend: Sept 2026. Get briefing.</p>
            </div>
        </section>
    `,

    philosophy: `
        <section>
            <h1>TRAINING PHILOSOPHY</h1>
            <hr style="border-color: var(--gold); margin: 1rem 0;">
            <p class="hero-subtitle">"LIVE LIFE ON PURPOSE."</p>
            <div class="grid-system">
                <div class="card"><h3>DISCIPLINE</h3><p>Motivation is fleeting. Discipline is the framework for freedom.</p></div>
                <div class="card"><h3>STRENGTH</h3><p>Capacity to handle the load of life, physically and spiritually.</p></div>
                <div class="card"><h3>NATURE</h3><p>We are designed for the wild. Get outside. Get uncomfortable.</p></div>
            </div>
        </section>
    `,

    coaching: `
        <section>
            <h1>COACHING TIERS</h1>
            <div class="grid-system">
                <div class="card">
                    <span class="card-tag">TIER 1</span>
                    <h3>1:1 PERFORMANCE</h3>
                    <p>Fully individualized programming + nutrition.</p>
                    <button class="btn-gold" style="margin-top:1rem; width:100%">APPLY</button>
                </div>
                 <div class="card">
                    <span class="card-tag">TIER 2</span>
                    <h3>HYBRID GROUP</h3>
                    <p>Team training for OCR and endurance athletes.</p>
                    <button class="btn-outline" style="margin-top:1rem; width:100%">JOIN WAITLIST</button>
                </div>
            </div>
        </section>
    `,

    programs: `
        <section>
            <h1>FIELD MANUALS // PROGRAMS</h1>
            <p>Downloadable protocols. Build the engine.</p>
            <div class="grid-system" id="program-grid">
                </div>
        </section>
    `,

    podcast: `
        <section class="podcast-container">
            <h1>THE ACTIVE MISSION PODCAST</h1>
            <p>Unfiltered discussion on faith, fitness, and freedom.</p>
            
            <div class="platform-links">
                <button class="btn-gold" onclick="window.open('#', '_blank')">WATCH ON YOUTUBE</button>
                <button class="btn-outline" onclick="window.open('#', '_blank')">RUMBLE (UNCENSORED)</button>
            </div>

            <div class="yt-embed-placeholder mono-text">
                [ YOUTUBE PLAYLIST EMBED PLACEHOLDER ]
            </div>
        </section>
    `,

    events: `
        <section>
            <h1>MISSION EVENTS</h1>
            <div class="event-row">
                <h2>KICKOFF WEEKEND '26</h2>
                <div class="event-meta mono-text">
                    <span>DATE: 12-13 SEP 2026</span> | 
                    <span>LOC: QUEEN CREEK, AZ</span>
                </div>
                <p>The inaugural gathering. Training, fellowship, and field work. Pack light, move fast.</p>
                
                <h4 style="margin-top:2rem">ITINERARY</h4>
                <ul class="program-specs">
                    <li>0600: RUCK MARCH</li>
                    <li>0900: TACTICAL STRENGTH</li>
                    <li>1300: RECOVERY PROTOCOLS</li>
                    <li>1800: FELLOWSHIP & FOOD</li>
                </ul>

                <button class="btn-gold" id="add-calendar-btn" style="margin-top:2rem;">ADD TO CALENDAR (.ICS)</button>
            </div>
        </section>
    `
};

// --- DATA ---
const programsData = [
    { name: "OCR SPECIALIST", focus: "Speed + Grip", tag: "RACE" },
    { name: "HYBRID ENGINE", focus: "Run + Lift", tag: "ENDURANCE" },
    { name: "TACTICAL STRONGMAN", focus: "Odd Objects", tag: "POWER" },
    { name: "BACKCOUNTRY HUNTER", focus: "Rucking + Durability", tag: "FIELD" },
    { name: "OLYMPIC LIFTING", focus: "Explosive Power", tag: "TECHNIQUE" },
    { name: "POWERLIFTING", focus: "Raw Strength", tag: "FORCE" },
];

// --- 1. LOADER LOGIC ---
// NOTE: NKJV Isaiah 40:31 text placeholder as requested.
const VERSERAW = "But those who wait on the Lord Shall renew their strength; They shall mount up with wings like eagles, They shall run and not be weary, They shall walk and not faint.";
const VERSE_CITE = " // ISAIAH 40:31";

function initLoader() {
    const textContainer = document.getElementById('verse-container');
    const brandFlash = document.getElementById('brand-flash');
    const overlay = document.getElementById('loader-overlay');

    let i = 0;
    const speed = 30; // Typing speed in ms

    function typeWriter() {
        if (i < VERSERAW.length) {
            textContainer.innerHTML += VERSERAW.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Finished typing, show reference
            textContainer.innerHTML += `<span style='color:#B08D57'>${VERSE_CITE}</span>`;
            setTimeout(() => {
                brandFlash.style.opacity = '1';
                brandFlash.style.transform = 'scale(1)';

                setTimeout(() => {
                    // Fade out loader
                    overlay.style.transition = "opacity 0.8s ease";
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 800);

                    // Init Content
                    app.router('home');
                }, 1500);
            }, 500);
        }
    }

    // Start typing after short delay
    setTimeout(typeWriter, 500);
}

// --- 2. HUD & TIME LOGIC ---
function updateHUD() {
    // Mission Timer (Time on Page)
    const now = Date.now();
    const diff = new Date(now - app.startTime);
    const h = String(diff.getUTCHours()).padStart(2, '0');
    const m = String(diff.getUTCMinutes()).padStart(2, '0');
    const s = String(diff.getUTCSeconds()).padStart(2, '0');
    document.getElementById('mission-timer').innerText = `T+${h}:${m}:${s}`;

    // Local Military Time
    const local = new Date();
    const lm = String(local.getHours()).padStart(2, '0');
    const ls = String(local.getMinutes()).padStart(2, '0');
    document.getElementById('clock-display').innerText = `LOCAL ${lm}:${ls}`;

    requestAnimationFrame(updateHUD);
}

// Geolocation
function initGeo() {
    const el = document.getElementById('geo-display');
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                el.innerText = `LAT:${lat} LON:${lon}`;
                el.style.color = "var(--gold)";
            },
            (error) => {
                el.innerText = "COORDS: PERMISSION DENIED";
                el.style.color = "#555";
            }
        );
    } else {
        el.innerText = "COORDS: N/A";
    }
}

// --- 3. ROUTER ---
app.router = function (pageName) {
    if (pageName === 'store') {
        window.open('https://shopify.com', '_blank'); // Placeholder
        return;
    }

    const container = document.getElementById('app-container');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Update Nav
    navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === pageName);
    });

    // Content Swap with Fade
    container.style.opacity = 0;

    setTimeout(() => {
        // Inject Template
        container.innerHTML = templates[pageName] || templates['home'];

        // Dynamic Logic for specific pages
        if (pageName === 'programs') renderPrograms();
        if (pageName === 'events') attachEventLogic();

        // Fade In
        container.style.opacity = 1;

        // Animate Sections inside
        const sections = container.querySelectorAll('section');
        sections.forEach(s => {
            s.classList.add('page-section', 'active');
            setTimeout(() => s.classList.add('fade-in'), 50);
        });

        window.scrollTo(0, 0);
    }, 300);
};

// --- 4. PAGE SPECIFIC LOGIC ---

function renderPrograms() {
    const grid = document.getElementById('program-grid');
    programsData.forEach(prog => {
        grid.innerHTML += `
            <div class="card">
                <span class="card-tag">FOCUS: ${prog.tag}</span>
                <h3>${prog.name}</h3>
                <p>Output: ${prog.focus}</p>
                <div class="program-specs">
                   <button class="btn-outline" style="width:100%; font-size:0.8rem" disabled>COMING SOON</button>
                   <div style="margin-top:5px; font-size:0.7rem; text-align:center">NOTIFY ME</div>
                </div>
            </div>
        `;
    });
}

function attachEventLogic() {
    const btn = document.getElementById('add-calendar-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            // Using the ics.js utility
            const cal = ics();
            cal.addEvent('The Active Mission Kickoff', 'Training, Fellowship, Field Work', 'Queen Creek, AZ', '09/12/2026', '09/13/2026');
            cal.download('ActiveMission_Kickoff');
        });
    }
}

// --- 5. UI INTERACTIONS ---

// Mobile Sticky CTA Scroll Logic
window.addEventListener('scroll', () => {
    const sticky = document.querySelector('.mobile-sticky-cta');
    if (window.scrollY > 300) sticky.classList.add('visible');
    else sticky.classList.remove('visible');
});

// Readiness Modal
document.getElementById('readiness-trigger').addEventListener('click', () => {
    document.getElementById('readiness-modal').classList.remove('hidden');
});
document.getElementById('close-readiness').addEventListener('click', () => {
    document.getElementById('readiness-modal').classList.add('hidden');
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    updateHUD();
    initGeo();

    // Bind Nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => app.router(e.target.dataset.target));
    });
});