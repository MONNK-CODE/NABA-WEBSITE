// ===== Launch time: Sept 1, 2025 5:00 PM CT =====
const LAUNCH = new Date("2025-09-01T17:00:00-05:00");

const pad = n => String(n).padStart(2, "0");
const $ = id => document.getElementById(id);

function render() {
    const now = new Date();
    let diff = LAUNCH.getTime() - now.getTime();


    const d = Math.floor(diff / (1000*60*60*24)); diff %= (1000*60*60*24);
    const h = Math.floor(diff / (1000*60*60));    diff %= (1000*60*60);
    const m = Math.floor(diff / (1000*60));       diff %= (1000*60);
    const s = Math.floor(diff / 1000);

    $("countdown").innerHTML = `
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-green)">${pad(d)}</div><div class="label">Days</div></span>
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-gold)">${pad(h)}</div><div class="label">Hours</div></span>
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-green)">${pad(m)}</div><div class="label">Minutes</div></span>
        <span class="slot d-inline-block text-center"><div class="h2 m-0" style="color:var(--naba-gold)">${pad(s)}</div><div class="label">Seconds</div></span>
      `;

    // ==== underconstruction-page ====
    const manual = getManualProgress();
        // If no manual control set, compute relative to a default start date.
        const DEFAULT_START = new Date("2025-07-15T00:00:00-05:00");
        const total = LAUNCH.getTime() - DEFAULT_START.getTime();
        const elapsed = Math.max(0, Math.min(total, now.getTime() - DEFAULT_START.getTime()));
        const pct = total > 0 ? Math.round((elapsed / total) * 100) : 0;
}

render();
setInterval(render, 1000);
$("year").textContent = new Date().getFullYear();