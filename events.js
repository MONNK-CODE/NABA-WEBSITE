(async function () {
    const calendarId = "uiucnaba@gmail.com";
    const apiKey     = "AIzaSyCWSvaysAMq_lFnFO0svrz0FaaoQIDW3hs";
    const timeMin    = new Date().toISOString();
    const maxResults = 8;
    const tz         = "America/Chicago";

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
    url.search = new URLSearchParams({
        key: apiKey,
        orderBy: "startTime",
        singleEvents: "true",
        timeMin,
        maxResults
    }).toString();

    const grid = document.getElementById("events-grid");
    if (!grid) return;

    try {
        const res = await fetch(url.toString());
        const data = await res.json();

        if (!data.items || !data.items.length) {
            grid.innerHTML = `<p class="muted">No upcoming events yet. Check back soon.</p>`;
            return;
        }

        grid.innerHTML = "";

        // Keep only future (or now) events and sort just in case
        const items = data.items
            .filter(ev => ev.start?.dateTime || ev.start?.date)
            .sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

        items.forEach(ev => {
            const startISO = ev.start.dateTime || ev.start.date;  // date = all-day
            const when = formatWhen(startISO, tz);
            const title = (ev.summary || "Untitled Event").trim();
            const notes = formatNotes(ev.description || "");
            const loc   = (ev.location || "").trim();

            // Build card with YOUR classes (no extra links)
            const notesHtml = formatNotes(ev.description || "");
            const card = document.createElement("article");
            card.className = "event";
            card.innerHTML = `
  <span class="pill">${when}</span>
  <h4>${escapeHTML(title)}</h4>
  ${notesHtml ? `<p class="muted">${notesHtml}</p>` : ``}
 ${loc ? `
  <p class="muted">
    📍 <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}"
          target="_blank" rel="noopener">
        ${escapeHTML(loc)}
    </a>
  </p>` : ``}
`;
            grid.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        grid.innerHTML = `<p class="muted">Unable to load events right now.</p>`;
    }

    // helpers
    function formatWhen(isoLike, timeZone) {
        // All-day (YYYY-MM-DD) vs timed (ISO datetime)
        const isAllDay = isoLike.length <= 10;
        const d = new Date(isoLike);
        if (isAllDay) {
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone });
        } else {
            const day  = d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone });
            const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });
            return `${day} • ${time}`;
        }
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    function formatNotes(desc) {
        // 1) Turn HTML into plain text (strips tags + decodes entities)
        const tmp = document.createElement("div");
        tmp.innerHTML = desc || "";
        let text = (tmp.textContent || "").trim();

        // 2) Collapse excessive blank lines (Word/Outlook dumps lots of wrappers)
        text = text.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n");

        // 3) Turn newlines into <br> for display
        const html = text.replace(/\n/g, "<br>");

        return html; // safe to inject as innerHTML since we stripped tags above
    }
})();