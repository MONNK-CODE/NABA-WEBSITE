function createGallery(containerId, folder, files, altText) {
    const container = document.getElementById(containerId);
    if (!container) return;

    files.forEach(file => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = `../photos/${folder}/${file}`;
        img.alt = altText;
        img.loading = "lazy";

        item.appendChild(img);
        container.appendChild(item);
    });
}




/* ===== NABA E-BOARD FALL 2025 ===== */
createGallery(
    "photo-fall2025",
    "photo-fall2025",
    [
        "_DSC9598.jpg",
        "_DSC9600.jpg",
        "_DSC9608.jpg",
        "_DSC9612.jpg",
        "_DSC9668.jpg"
    ],
    "NABA E-BOARD FALL 2025 PHOTOSHOOT"
);



/* ===== EY EVENT ===== */
createGallery(
    "ey-event-gallery",
    "ey-event",
    [
        "IMG_7476.jpeg",
        "IMG_7477.jpeg",
        "IMG_7478.jpeg",
        "IMG_7480.jpeg",
        "IMG_7481.jpeg",
        "IMG_7484.jpeg"
    ],
    "EY Event photo"
);

/* ===== INFO NIGHT ===== */
createGallery(
    "info-night-gallery",
    "info-night",
    [
        "IMG_2640.jpeg",
        "IMG_2642.jpeg",
        "IMG_7306.jpeg"
    ],
    "Info Night event photo"
);

/* ===== GREENWOOD FIRESIDE CHAT ===== */
createGallery(
    "greenwood-fireside-chat",
    "greenwood-fireside-chat",
    [
        "IMG_0916.jpg",
        "IMG_0931.jpg",
        "IMG_0934.jpg",
        "IMG_0935.jpg",
        "IMG_0939.jpg",
        "IMG_0946.jpg",
        "IMG_0948.jpg",
        "IMG_0952.jpg"
    ],
    "Greenwood Fireside Chat photo"
);

/* ===== PLANET FORVIS ===== */
createGallery(
    "planet-forvis-gallery",
    "planet-forvis",
    [
        "IMG_3166.jpg",
        "IMG_3169.jpg",
        "IMG_3172.jpg",
        "IMG_8887.jpg",
        "IMG_8888.jpg",
        "IMG_8889.jpg",
        "IMG_8890.jpg",
        "IMG_8893.jpg",
        "IMG_8895.jpg"
    ],
    "Planet Forvis event photo"
);

/* ===== PWC EVENT ===== */
createGallery(
    "pwc-event-gallery",
    "pwc-event",
    [
        "IMG_8318.jpg",
        "IMG_8319.jpg",
        "IMG_8320.jpg",
        "IMG_8321.jpg",
        "IMG_8322.jpg",
        "IMG_8323.jpg",
        "IMG_8325.jpg"
    ],
    "PwC event photo"
);

