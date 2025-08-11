// ===== Launch time: Sept 1, 2025 5:00 PM Chicago (CDT = UTC-05) =====
const LAUNCH = new Date("2025-09-01T17:00:00-05:00");

// ===== Progress control options =====
// Option A: set a fixed number here (0–100) to override computed progress:
const MANUAL_PROGRESS = 23; // e.g., 72 to force 72%
// Option B: via URL like ?progress=72
const urlProgress = (() => {
    const p = new URLSearchParams(location.search).get("progress");
    return p !== null && p !== "" ? Math.max(0, Math.min(100, Number(p))) : null;
})();
// Option C: via data attribute on <body data-progress="72">
const attrProgress = (() => {
    const v = document.body.getAttribute("data-progress");
    return v ? Math.max(0, Math.min(100, Number(v))) : null;
})();

const pad = n => String(n).padStart(2, "0");
const $ = id => document.getElementById(id);

function getManualProgress() {
    if (typeof MANUAL_PROGRESS === "number") return Math.max(0, Math.min(100, MANUAL_PROGRESS));
    if (urlProgress !== null) return urlProgress;
    if (attrProgress !== null) return attrProgress;
    return null; // fall back to computed progress
}

function render() {
    const now = new Date();
    let diff = LAUNCH.getTime() - now.getTime();

    if (diff <= 0) {
        $("countdown").innerHTML = `<span class="slot d-inline-block text-center">
          <div class="h4 m-0">We’re Live!</div><div class="label">🎉</div></span>`;
        $("progressBar").style.width = "100%";
        $("progressLabel").textContent = "100%";
        return;
    }

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

    // ==== Progress ====
    const manual = getManualProgress();
    if (manual !== null) {
        $("progressBar").style.width = manual + "%";
        $("progressLabel").textContent = manual + "%";
    } else {
        // If no manual control set, compute relative to a default start date.
        const DEFAULT_START = new Date("2025-07-15T00:00:00-05:00");
        const total = LAUNCH.getTime() - DEFAULT_START.getTime();
        const elapsed = Math.max(0, Math.min(total, now.getTime() - DEFAULT_START.getTime()));
        const pct = total > 0 ? Math.round((elapsed / total) * 100) : 0;
        $("progressBar").style.width = pct + "%";
        $("progressLabel").textContent = pct + "%";
    }
}

render();
setInterval(render, 1000);
$("year").textContent = new Date().getFullYear();