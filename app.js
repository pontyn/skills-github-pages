// Données dynamiques
const villageContent = {
    nom: "ZANIKRO",
    histoire: [
        {
            titre: "Fondation de ZANIKRO",
            contenu: "Mon village a été créé en 1920",
            image: "images/gallery1.jpg",
            alt: "Village de Zanikro dans les années 1920"
        },
        {
            titre: "Évolution Moderne",
            contenu: "Zanikro est connu pour ses infrastructures et son développement agricole...",
            image: "images/histoire2.jpg",
            alt: "Vue aérienne de Zanikro montrant ses infrastructures modernes"
        }
    ],
    galerie: [
        {src: "images/gallery3.jpg", desc: "Église de Zanikro", alt: "Façade de l'église de Zanikro"},
        {src: "images/gallery1.jpg", desc: "village de Zanikro", alt: "Vue panoramique du village"},
        {src: "images/gallery2.jpg", desc: "Marché de Zanikro", alt: "Marché animé de Zanikro"},
    ]
};

// Génération du contenu dynamique
document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour du nom du village
    document.querySelectorAll('.village-name').forEach(el => {
        el.textContent = villageContent.nom;
    });

    // Génération de l'histoire
    const historyContainer = document.getElementById('historyContainer');
    if (historyContainer) {
        villageContent.histoire.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.alt}" class="history-img" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
                <h3>${item.titre}</h3>
                <p>${item.contenu}</p>
            `;
            historyContainer.appendChild(card);
        });
    }

    // Génération de la galerie
    const gallery = document.getElementById('gallery');
    if (gallery) {
        villageContent.galerie.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.alt}" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
                <div class="image-overlay">${item.desc}</div>
            `;
            galleryItem.addEventListener('click', () => openModal(item.src, item.desc));
            gallery.appendChild(galleryItem);
        });
    }
});

// Gestion de la modal
function openModal(src, desc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.querySelector('.modal-content');
    const caption = document.getElementById('caption');

    if (modal && modalImg && caption) {
        modal.style.display = "block";
        modalImg.src = src;
        modalImg.alt = desc; // Ajout pour l'accessibilité
        caption.textContent = desc;

        // Fermeture au clic en dehors de l'image
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }
}

// Fermeture de la modal
const closeButton = document.querySelector('.close');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = "none";
        }
    });
}

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});