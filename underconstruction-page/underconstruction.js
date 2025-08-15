// ===== Launch time: Sept 1, 2025 5:00 PM CT =====
const LAUNCH = new Date("2025-09-01T17:00:00-05:00");

// --- Helper Functions ---
const pad = n => String(n).padStart(2, "0");
const $ = id => document.getElementById(id);

// --- Store the interval ID so we can stop it later ---
const countdownInterval = setInterval(render, 1000);

function render() {
    const now = new Date();
    const diff = LAUNCH.getTime() - now.getTime();

    // ==== 1. Handle countdown completion ====
    if (diff <= 0) {
        clearInterval(countdownInterval); // Stop the timer
        $("countdown").innerHTML = `
            <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-green)">00</div><div class="label">Days</div></span>
            <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-gold)">00</div><div class="label">Hours</div></span>
            <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-green)">00</div><div class="label">Minutes</div></span>
            <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-gold)">00</div><div class="label">Seconds</div></span>
        `;
        return; // Exit the function
    }

    // --- Calculate time remaining ---
    let remaining = diff;
    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    remaining %= (1000 * 60 * 60 * 24);
    const h = Math.floor(remaining / (1000 * 60 * 60));
    remaining %= (1000 * 60 * 60);
    const m = Math.floor(remaining / (1000 * 60));
    remaining %= (1000 * 60);
    const s = Math.floor(remaining / 1000);

    // --- Update the countdown display ---
    $("countdown").innerHTML = `
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-green)">${pad(d)}</div><div class="label">Days</div></span>
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-gold)">${pad(h)}</div><div class="label">Hours</div></span>
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-green)">${pad(m)}</div><div class="label">Minutes</div></span>
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-gold)">${pad(s)}</div><div class="label">Seconds</div></span>
    `;


// --- Initial Render & Setup ---
    render();
    $("year").textContent = new Date().getFullYear();
}