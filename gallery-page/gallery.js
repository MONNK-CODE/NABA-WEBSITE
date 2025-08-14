// --- Gallery Lightbox ---
(function () {
    const mq = window.matchMedia('(min-width: 1001px) and (pointer: fine)');
    let bound = false;
    let handlers = [];
    let closingTimer;

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    function openLightbox(img) {
        clearTimeout(closingTimer);
        lightbox.classList.remove('closing'); // ensure not in closing state
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent =
            (img.closest('.gallery-item')?.dataset.caption) ||
            (img.closest('.gallery-item')?.querySelector('.gallery-caption')?.textContent?.trim()) ||
            img.alt || '';
        // trigger open on next frame for smooth transition
        requestAnimationFrame(() => {
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeLightbox() {
        if (!lightbox.classList.contains('open')) return;
        lightbox.classList.add('closing');
        // wait for CSS transition to finish before fully hiding
        clearTimeout(closingTimer);
        closingTimer = setTimeout(() => {
            lightbox.classList.remove('open', 'closing');
            document.body.style.overflow = '';
        }, 260); // match CSS .26s
    }

    function escClose(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    }

    function bind() {
        if (bound) return;
        handlers = [];
        document.querySelectorAll('.gallery-item img').forEach(img => {
            const h = () => openLightbox(img);
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', h);
            handlers.push({ img, h });
        });
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', escClose);
        bound = true;
    }

    function unbind() {
        if (!bound) return;
        handlers.forEach(({ img, h }) => {
            img.removeEventListener('click', h);
            img.style.cursor = 'default';
        });
        handlers = [];
        document.removeEventListener('keydown', escClose);
        lightbox.classList.remove('open', 'closing');
        document.body.style.overflow = '';
        bound = false;
    }

    // Init & respond to viewport changes
    mq.matches ? bind() : unbind();
    mq.addEventListener('change', e => e.matches ? bind() : unbind());
})();