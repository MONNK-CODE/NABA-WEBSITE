// New, self-contained lightbox with subtle scale+fade, keys, click, and swipe.
// No external libraries required.

(() => {
    // === Utility ===
    const qs = (s, el = document) => el.querySelector(s);
    const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

    // Build lightbox once
    const lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = `
    <div class="lb-inner" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div class="lb-card">
        <button class="lb-close" aria-label="Close"><span class="lb-icon">✕</span></button>
        <button class="lb-prev" aria-label="Previous" title="Previous"><span class="lb-icon">‹</span></button>
        <button class="lb-next" aria-label="Next" title="Next"><span class="lb-icon">›</span></button>

        <div class="lb-media">
          <img class="lb-img" alt="">
        </div>
        <div class="lb-cap" aria-live="polite"></div>
      </div>
    </div>
  `;
    document.body.appendChild(lb);

    const inner = qs('.lb-inner', lb);
    const imgEl = qs('.lb-img', lb);
    const capEl = qs('.lb-cap', lb);
    const btnClose = qs('.lb-close', lb);
    const btnPrev = qs('.lb-prev', lb);
    const btnNext = qs('.lb-next', lb);

    let items = [];      // {href, imgEl, caption}
    let current = -1;    // active index
    let lastFocused = null;
    let startX = 0;      // for swipe

    // Collect items within any .gallery-grid
    function collect() {
        items = [];
        qsa('.gallery-grid').forEach(grid => {
            qsa('a[href] > img', grid).forEach(img => {
                const a = img.parentElement;
                const fig = a.closest('figure');
                const cap = (fig && qs('figcaption', fig)?.textContent.trim()) || img.alt || '';
                items.push({ href: a.getAttribute('href'), imgEl: img, caption: cap });
            });
        });
    }
    collect();

    // Scroll lock
    const lockScroll = (on) => {
        document.documentElement.style.overflow = on ? 'hidden' : '';
        document.body.style.overflow = on ? 'hidden' : '';
    };

    // Open
    function openAt(index) {
        if (!items.length) collect();
        if (!items.length) return;

        current = (index + items.length) % items.length;
        const it = items[current];

        // reset state
        lb.classList.remove('out');
        imgEl.removeAttribute('src');
        imgEl.alt = '';
        capEl.textContent = '';

        // preload then reveal
        const probe = new Image();
        probe.onload = () => {
            imgEl.src = it.href;
            imgEl.alt = items[current].imgEl.alt || '';
            capEl.textContent = it.caption || '';
            lb.classList.add('open');
            lockScroll(true);
            // Focus close for accessibility
            btnClose.focus({ preventScroll: true });
        };
        probe.onerror = () => {
            imgEl.src = it.href;
            lb.classList.add('open');
            lockScroll(true);
            btnClose.focus({ preventScroll: true });
        };
        probe.src = it.href;
    }

    function close() {
        lb.classList.add('out');
        // wait for short out animation to finish
        setTimeout(() => {
            lb.classList.remove('open', 'out');
            imgEl.removeAttribute('src');
            capEl.textContent = '';
            lockScroll(false);
            if (lastFocused) lastFocused.focus();
        }, 120);
    }

    function next(delta = 1) {
        if (!items.length) return;
        const i = (current + delta + items.length) % items.length;
        openAt(i);
    }

    // Delegated click: open when clicking any gallery image
    document.addEventListener('click', (e) => {
        const img = e.target.closest('.gallery-grid a > img');
        if (!img) return;

        e.preventDefault();
        lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (!items.length) collect();
        const idx = items.findIndex(it => it.imgEl === img);
        openAt(idx >= 0 ? idx : 0);
    });

    // Backdrop close
    inner.addEventListener('click', (e) => {
        // Close if clicking backdrop area (outside card)
        const card = e.target.closest('.lb-card');
        if (!card) close();
    });

    // Buttons
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => next(-1));
    btnNext.addEventListener('click', () => next(1));

    // Keys
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') next(1);
        else if (e.key === 'ArrowLeft') next(-1);
    });

    // Swipe (discreet; no visible handles needed)
    inner.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    inner.addEventListener('touchend', (e) => {
        if (!startX) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 42) next(dx < 0 ? 1 : -1);
        startX = 0;
    }, { passive: true });

    // Footer year helper (if not handled globally)
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // Minimal mobile menu toggle fallback (if not in your global script)
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            mobileMenu.classList.toggle('open');
        });
    }
})();