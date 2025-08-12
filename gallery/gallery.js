// --- Gallery Lightbox ---
(function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Open lightbox on image click
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.nextElementSibling?.textContent || img.alt || '';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden'; // prevent background scroll
        });
    });

    // Close lightbox on close button or backdrop click
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
})();