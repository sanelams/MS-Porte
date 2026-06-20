const galleryButtons = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxVideo = document.querySelector('.lightbox-video');

if (galleryButtons.length && lightbox && lightboxImg && lightboxVideo && lightboxClose) {
  galleryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const src = button.dataset.src;
      const type = button.dataset.type || 'image';
      const alt = button.dataset.alt || `Image ${index + 1}`;

      lightboxCaption.textContent = alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      lightboxClose.focus();

      if (type === 'video') {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.load();
        lightboxVideo.play().catch(() => {
          // autoplay may be blocked; let user start playback manually
        });
      } else {
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxVideo.style.display = 'none';
        lightboxImg.style.display = 'block';
        lightboxImg.src = src;
        lightboxImg.alt = alt;
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

const servicesText = document.getElementById('servicesText');
const servicesToggle = document.getElementById('servicesToggle');

if (servicesText && servicesToggle) {
  const setCollapsedHeight = () => {
    if (servicesText.classList.contains('expanded')) {
      servicesText.style.maxHeight = `${servicesText.scrollHeight}px`;
    } else {
      servicesText.style.maxHeight = '';
    }
  };

  servicesToggle.addEventListener('click', () => {
    const expanded = servicesText.classList.toggle('expanded');
    servicesToggle.textContent = expanded ? 'Voir moins' : 'Voir plus';
    setCollapsedHeight();
  });

  window.addEventListener('resize', () => {
    if (servicesText.classList.contains('expanded')) {
      servicesText.style.maxHeight = `${servicesText.scrollHeight}px`;
    }
  });

  // Ensure initial collapsed state doesn't overflow
  servicesText.style.maxHeight = '';
}
