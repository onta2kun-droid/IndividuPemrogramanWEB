const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

if (galleryItems.length > 0 && lightbox && lightboxImg) {
  function showImage(index) {
    const item = galleryItems[index];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (lightboxCaption) lightboxCaption.textContent = item.alt;
    currentIndex = index;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
const certificateCards = document.querySelectorAll('.certificate-card');
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfModalClose = document.getElementById('pdfModalClose');

if (certificateCards.length > 0 && pdfModal && pdfViewer) {
  function openPdfModal(pdfPath, title) {
    const resolvedPdfUrl = new URL(pdfPath, window.location.href).href;

    if (pdfModalTitle) {
      pdfModalTitle.textContent = title || 'Preview Sertifikat';
    }

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(resolvedPdfUrl, '_blank');
      return;
    }

    pdfViewer.src = resolvedPdfUrl + '#toolbar=0&navpanes=0&scrollbar=1';
    pdfModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closePdfModal() {
    pdfModal.classList.remove('show');
    pdfViewer.src = '';
    document.body.style.overflow = '';
  }

  certificateCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pdfPath = card.getAttribute('data-pdf');
      const title = card.getAttribute('data-title');
      console.log('PDF dibuka:', pdfPath);
      openPdfModal(pdfPath, title);
    });
  });

  if (pdfModalClose) {
    pdfModalClose.addEventListener('click', closePdfModal);
  }

  pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
      closePdfModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (pdfModal.classList.contains('show') && e.key === 'Escape') {
      closePdfModal();
    }
  });
}