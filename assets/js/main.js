/**
 * THE ACTIVE MISSION - CORE SYSTEM
 * Architecture: SPA (Single Page Application)
 */

const app = {
    state: {
        page: 'home',
        startTime: Date.now()
    },

    // --- CONTENT DATABASE (Full Content) ---
    content: {
        home: `
            <article class="page-view">
                <section class="hero-section">
                    <div class="hero-content">
                        <span class="hero-sub">OPERATIONAL READINESS: ACTIVE</span>
                        <h1>FORGING DURABLE HUMANS</h1>
                        <p style="font-size: 1.2rem; color: var(--light-gray); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                            We build athletes who are physically capable, mentally hardened, and spiritually grounded. This is not for the faint of heart. This is training for life.
                        </p>
                        <div class="cta-group">
                            <button class="btn-gold" onclick="app.router('coaching')">JOIN THE MISSION</button>
                            <button class="btn-outline" onclick="app.router('programs')">FIELD MANUALS</button>
                        </div>
                    </div>
                </section>

                <section class="grid-system">
                    <div class="card" role="button" tabindex="0" onclick="app.router('philosophy')" onkeydown="if(event.key === 'Enter') app.router('philosophy')">
                        <div class="card-header">
                            <span class="card-tag">01 // ETHOS</span>
                            <h3>PHILOSOPHY</h3>
                        </div>
                        <div class="card-body">
                            <p>Intentional suffering produces endurance. Explore our methodology on discipline, faith, and the hybrid athlete lifestyle.</p>
                        </div>
                        <div class="card-footer">
                            <span class="gold-text">READ MANIFESTO &rarr;</span>
                        </div>
                    </div>

                    <div class="card" role="button" tabindex="0" onclick="app.router('programs')" onkeydown="if(event.key === 'Enter') app.router('programs')">
                         <div class="card-header">
                            <span class="card-tag">02 // PROTOCOLS</span>
                            <h3>TRAINING</h3>
                        </div>
                         <div class="card-body">
                            <p>From OCR speed work to heavy rucking. Access our downloadable programming for specific mission profiles.</p>
                        </div>
                        <div class="card-footer">
                            <span class="gold-text">ACCESS DATA &rarr;</span>
                        </div>
                    </div>

                    <div class="card" role="button" tabindex="0" onclick="app.router('podcast')" onkeydown="if(event.key === 'Enter') app.router('podcast')">
                         <div class="card-header">
                            <span class="card-tag">03 // INTEL</span>
                            <h3>PODCAST</h3>
                        </div>
                         <div class="card-body">
                            <p>Tactical conversations on culture, theology, and human performance. Unfiltered weekly briefings.</p>
                        </div>
                        <div class="card-footer">
                            <span class="gold-text">LISTEN NOW &rarr;</span>
                        </div>
                    </div>
                </section>
            </article>
        `,

        philosophy: `
            <article class="page-view">
                <header style="border-bottom: 1px solid var(--gold); margin-bottom: 3rem; padding-bottom: 1rem;">
                    <span class="mono-text gold-text">SECTION: ETHOS</span>
                    <h1>LIVE LIFE ON PURPOSE.</h1>
                </header>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;">
                    <div>
                        <h3>01. THE HYBRID STANDARD</h3>
                        <p style="margin-bottom: 1.5rem; color: var(--light-gray);">
                            Specialization is for insects. The modern world requires a human who can run fast, lift heavy, and endure the elements. We train to be useful in any scenario.
                        </p>
                        <ul class="tech-list">
                            <li>Aerobic Capacity (Engine)</li>
                            <li>Structural Integrity (Durability)</li>
                            <li>Absolute Strength (Force)</li>
                        </ul>
                    </div>
                    <div>
                        <h3>02. SPIRITUAL RESILIENCE</h3>
                        <p style="margin-bottom: 1.5rem; color: var(--light-gray);">
                            Physical strength without spiritual grounding is vanity. We believe in discipline as a form of worship. Hardship is not an accident; it is a forge.
                        </p>
                        <blockquote style="border-left: 2px solid var(--gold); padding-left: 1rem; font-style: italic; color: var(--white);">
                            "But I discipline my body and bring it into subjection..."
                        </blockquote>
                    </div>
                </div>
            </article>
        `,

        coaching: `
            <article class="page-view">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <h1>COACHING TIERS</h1>
                    <p style="max-width: 600px; margin: 0 auto; color: var(--light-gray);">Professional guidance for those willing to do the work. No shortcuts. No hacks.</p>
                </div>

                <div class="grid-system">
                    <div class="card" style="border-color: var(--gold);">
                        <div class="card-header">
                            <span class="card-tag">TIER 1 // ELITE</span>
                            <h3>1:1 PERFORMANCE</h3>
                        </div>
                        <div class="card-body">
                            <p>Fully individualized programming tailored to your physiology and race calendar.</p>
                            <ul class="tech-list">
                                <li>Custom Training Blocks</li>
                                <li>Nutrition & Macro Audits</li>
                                <li>Weekly Video Check-ins</li>
                                <li>Race Strategy Formulation</li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <button class="btn-gold" style="width: 100%">APPLY FOR SELECTION</button>
                        </div>
                    </div>

                    <div class="card">
                         <div class="card-header">
                            <span class="card-tag">TIER 2 // SQUAD</span>
                            <h3>HYBRID GROUP</h3>
                        </div>
                        <div class="card-body">
                            <p>Join the team track. Follow the exact programming used by our competitive athletes.</p>
                             <ul class="tech-list">
                                <li>Daily Workout App Access</li>
                                <li>Leaderboard Competition</li>
                                <li>Community Discord Channel</li>
                                <li>Movement Library</li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <button class="btn-outline" style="width: 100%">JOIN WAITLIST</button>
                        </div>
                    </div>
                </div>
            </article>
        `,

        programs: `
            <article class="page-view">
                <h1>FIELD MANUALS</h1>
                <p style="color: var(--light-gray); margin-bottom: 2rem;">Standalone operational guides. Download, print, execute.</p>
                
                <div class="grid-system" id="program-grid">
                    </div>
            </article>
        `,

        podcast: `
            <article class="page-view">
                <div style="background: var(--dark-gray); padding: 3rem; border: 1px solid var(--mid-gray); text-align: center; margin-bottom: 3rem;">
                    <span class="mono-text gold-text">LATEST TRANSMISSION</span>
                    <h2 style="margin: 1rem 0;">EP. 042: THE MYTH OF BALANCE</h2>
                    <p style="margin-bottom: 2rem;">We discuss why "balance" is a trap and how obsession fuels greatness.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn-gold" onclick="window.open('#', '_blank')">WATCH ON YOUTUBE</button>
                        <button class="btn-outline" onclick="window.open('#', '_blank')">RUMBLE (UNCENSORED)</button>
                    </div>
                </div>

                <h3>ARCHIVE</h3>
                <div class="grid-system">
                    <div class="card">
                        <span class="card-tag">EPISODE 041</span>
                        <h4>NUTRITION FOR THE APOCALYPSE</h4>
                        <p class="small">Metabolic flexibility and survival.</p>
                    </div>
                    <div class="card">
                        <span class="card-tag">EPISODE 040</span>
                        <h4>FATHERHOOD & LEADERSHIP</h4>
                        <p class="small">Leading your family with conviction.</p>
                    </div>
                </div>
            </article>
        `,

        events: `
            <article class="page-view">
                <h1>MISSION EVENTS</h1>
                
                <div style="border-left: 4px solid var(--gold); padding-left: 2rem; background: rgba(255,255,255,0.02); padding: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
                        <div>
                            <h2>KICKOFF WEEKEND '26</h2>
                            <p class="mono-text gold-text">DATE: 12-13 SEP 2026 // LOC: QUEEN CREEK, AZ</p>
                        </div>
                        <div style="text-align: right; margin-top: 1rem;">
                            <span class="card-tag" style="border: 1px solid var(--gold); padding: 5px;">STATUS: CONFIRMED</span>
                        </div>
                    </div>

                    <p style="margin: 1.5rem 0; font-size: 1.1rem;">
                        The inaugural gathering of The Active Mission community. Two days of tactical fitness, theology workshops, and field recovery sessions.
                    </p>

                    <h4>ITINERARY</h4>
                    <ul class="tech-list" style="margin-bottom: 2rem;">
                        <li>0600: Team Ruck March (30lbs Payload)</li>
                        <li>0900: Sandbag & Stone Lifting Workshop</li>
                        <li>1300: "The Theology of Strength" Lecture</li>
                        <li>1800: BBQ & Fellowship</li>
                    </ul>

                    <button class="btn-gold" id="add-calendar-btn">ADD TO CALENDAR (.ICS)</button>
                </div>
            </article>
        `
    },

    // --- INIT ---
    init: function () {
        this.runLoader();
        this.startClock();
        this.getGeo();
        this.setupNav();
        this.setupModals();
    },

    // --- LOADER ---
    runLoader: function () {
        // NKJV Text
        const verseText = "But those who wait on the Lord Shall renew their strength; They shall mount up with wings like eagles, They shall run and not be weary, They shall walk and not faint.";
        const container = document.getElementById('verse-container');
        const loader = document.getElementById('loader-overlay');
        const flash = document.getElementById('brand-flash');

        let i = 0;
        const type = () => {
            if (i < verseText.length) {
                container.textContent += verseText.charAt(i);
                i++;
                setTimeout(type, 25);
            } else {
                container.innerHTML += "<br><br><span class='gold-text'>// ISAIAH 40:31</span>";
                setTimeout(() => {
                    flash.style.opacity = '1';
                    flash.style.transform = 'scale(1)';
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        loader.style.pointerEvents = 'none';
                        // Initial Route
                        this.router('home');
                    }, 1500);
                }, 800);
            }
        };
        setTimeout(type, 500);
    },

    // --- ROUTER ---
    router: function (page) {
        if (!this.content[page]) return;

        // Update Content
        const container = document.getElementById('app-container');
        container.innerHTML = this.content[page];

        // Update Nav State
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.target === page);
        });

        // Specific Page Logic
        if (page === 'programs') this.renderPrograms();
        if (page === 'events') this.attachCalendarLogic();

        // Scroll Top
        window.scrollTo(0, 0);

        // Focus Management for A11y
        container.focus();
    },

    // --- DATA RENDERERS ---
    renderPrograms: function () {
        const data = [
            { t: "OCR SPECIALIST", d: "Grip strength & running speed.", c: "RACE" },
            { t: "HYBRID ENGINE", d: "Concurrent strength & endurance.", c: "BUILD" },
            { t: "TACTICAL STRONGMAN", d: "Odd objects & raw power.", c: "FORCE" },
            { t: "BACKCOUNTRY HUNTER", d: "Rucking & durability.", c: "FIELD" },
            { t: "OLYMPIC LIFTING", d: "Explosive speed strength.", c: "TECH" },
            { t: "POWERLIFTING", d: "Maximal force production.", c: "RAW" },
        ];

        const grid = document.getElementById('program-grid');
        grid.innerHTML = data.map(item => `
            <div class="card">
                <div class="card-header">
                    <span class="card-tag">FOCUS: ${item.c}</span>
                    <h3>${item.t}</h3>
                </div>
                <div class="card-body">
                    <p>${item.d}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-outline" style="width:100%; font-size:0.9rem" disabled>COMING SOON</button>
                </div>
            </div>
        `).join('');
    },

    attachCalendarLogic: function () {
        const btn = document.getElementById('add-calendar-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const cal = ics();
                cal.addEvent('Active Mission Kickoff', 'Training & Fellowship', 'Queen Creek AZ', '09/12/2026', '09/13/2026');
                cal.download('ActiveMission_Kickoff');
            });
        }
    },

    // --- HUD UTILS ---
    startClock: function () {
        setInterval(() => {
            // Mission Time
            const now = Date.now();
            const diff = new Date(now - this.state.startTime);
            document.getElementById('mission-timer').textContent = diff.toISOString().substr(11, 8);

            // Local Time
            const d = new Date();
            const h = String(d.getHours()).padStart(2, '0');
            const m = String(d.getMinutes()).padStart(2, '0');
            document.getElementById('clock-display').textContent = `${h}${m}`;
        }, 1000);
    },

    getGeo: function () {
        const el = document.getElementById('geo-display');
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                p => el.textContent = `${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`,
                e => el.textContent = "SAT_UPLINK: DENIED"
            );
        } else {
            el.textContent = "NO GPS MODULE";
        }
    },

    setupNav: function () {
        document.querySelectorAll('.nav-btn:not(.external)').forEach(btn => {
            btn.addEventListener('click', () => this.router(btn.dataset.target));
        });
    },

    setupModals: function () {
        const modal = document.getElementById('readiness-modal');
        const trigger = document.getElementById('readiness-trigger');
        const close = document.getElementById('close-readiness');

        trigger.addEventListener('click', () => modal.showModal());
        close.addEventListener('click', () => modal.close());

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    }
};

// Start System
document.addEventListener('DOMContentLoaded', () => app.init());