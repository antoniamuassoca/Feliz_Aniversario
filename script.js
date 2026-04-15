// Surprise section JavaScript
(function () {
  const s1 = document.getElementById('stage-1');
  const s2 = document.getElementById('stage-2');
  const s3 = document.getElementById('stage-3');
  const final = document.getElementById('final-stage');
  const finalText = document.getElementById('finalText');
  const btnPrayer = document.getElementById('btn-prayer');
  const btnTY = document.getElementById('btn-ty');
  const btnBack = document.getElementById('btn-back');
  const confCanvas = document.getElementById('confettiCanvas');

  let chosen = { q1: null, q2: null, q3: null };

  function show(el) {
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('show'), 40);
    el.setAttribute('aria-hidden', 'false');
  }
  function hide(el) {
    el.classList.remove('show');
    setTimeout(() => el.classList.add('hidden'), 340);
    el.setAttribute('aria-hidden', 'true');
  }

  s1.querySelectorAll('.choice').forEach(ch => {
    ch.addEventListener('click', () => handleQ1(ch.dataset.answer));
    ch.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') handleQ1(ch.dataset.answer); });
  });

  function handleQ1(ans) {
    chosen.q1 = ans;
    if (ans === 'B') {
      showTinyToast("A tua força é persistência — seguimos.");
    } else {
      showTinyToast("Mesmo assim, o teu coração é incrível.");
    }
    hide(s1);
    setTimeout(() => show(s2), 420);
  }

  s2.querySelectorAll('.choice').forEach(ch => {
    ch.addEventListener('click', () => handleQ2(ch.dataset.answer));
    ch.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') handleQ2(ch.dataset.answer); });
  });

  function handleQ2(ans) {
    chosen.q2 = ans;
    if (ans === 'sweet') {
      showTinyToast("Doce — a escolha que revela o teu jeito.");
    } else {
      showTinyToast("Cada sabor diz algo bonito sobre ti.");
    }
    hide(s2);
    setTimeout(() => show(s3), 420);
  }

  s3.querySelectorAll('.choice').forEach(ch => {
    ch.addEventListener('click', () => handleQ3(ch.dataset.answer));
    ch.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') handleQ3(ch.dataset.answer); });
  });

  function handleQ3(ans) {
    chosen.q3 = ans;
    hide(s3);
    setTimeout(() => revealFinal(), 480);
  }

  function showTinyToast(text) {
    const t = document.createElement('div');
    t.textContent = text;
    t.style.position = 'fixed';
    t.style.left = '50%';
    t.style.transform = 'translateX(-50%)';
    t.style.bottom = '38px';
    t.style.background = 'linear-gradient(135deg,#fff,#fff5f7)';
    t.style.padding = '10px 16px';
    t.style.borderRadius = '12px';
    t.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
    t.style.fontWeight = '700';
    t.style.color = '#495057';
    t.style.zIndex = '9999';
    document.body.appendChild(t);
    setTimeout(() => t.style.opacity = '0', 1800);
    setTimeout(() => t.remove(), 2300);
  }

  function revealFinal() {
    const part1 = "Fábia, tu és mais do que parece. Por fora, uma armadura que protege. Por dentro, um coração que sabe amar.";
    const part2 = "A tua doçura aparece nos gestos tranquilos, nas pequenas coisas, no cuidado que só quem te conhece percebe.";
    const friendship = "Obrigado por seres essa amiga verdadeira — por cada silêncio que fala, por cada gesto discreto que sustenta. A tua amizade é um presente que ilumina muitos dias.";
    const prayer = "Que Deus te cubra de paz, te dê força nos dias difíceis, e multiplique a tua alegria. Que a fé te sustente, a esperança te guie, e o amor te acompanhe sempre.";

    finalText.innerHTML = `<p style="font-weight:700; color:#343a40; margin-bottom:6px;">${part1}</p>
                       <p style="color:#495057; margin-bottom:6px;">${part2}</p>
                       <hr style="border:none;border-top:1px dashed rgba(108,117,125,0.2);margin:8px 0;">
                       <p style="font-weight:700;color:#6c757d;margin-bottom:6px;">${friendship}</p>
                       <p style="color:#6c757d;margin-bottom:0;">${prayer}</p>`;

    show(final);

    const cake = document.getElementById('cake');
    cake.animate([
      { transform: 'translateY(10px) scale(.98)' },
      { transform: 'translateY(0px) scale(1)' },
      { transform: 'translateY(6px) scale(.995)' },
      { transform: 'translateY(0px) scale(1)' }
    ], { duration: 1600, iterations: Infinity });

    startConfetti();
    playChime();

    document.getElementById('btn-prayer').style.display = 'inline-block';
    document.getElementById('btn-ty').style.display = 'inline-block';
    btnBack.style.display = 'inline-block';
  }

  btnPrayer.addEventListener('click', () => {
    finalText.innerHTML = `<p style="font-weight:700;color:#343a40;">Uma pequena oração para ti</p>
  <p style="color:#495057;">Senhor, abençoa a Fábia com paz, dá-lhe força para cada manhã, alegria nas pequenas vitórias e serenidade no coração. Amém.</p>`;
    showTinyToast("Bênção enviada.");
  });

  btnTY.addEventListener('click', () => {
    finalText.innerHTML = `<p style="font-weight:700;color:#343a40;">Obrigado por existires, Fábia</p><p style="color:#495057;">A tua amizade é um farol — que ilumina sem pedir nada em troca. Obrigado por seres tu.</p>`;
    showTinyToast("Mensagem de amizade destacada.");
  });

  btnBack.addEventListener('click', () => {
    stopConfetti();
    stopChime();
    const homeBtn = document.querySelector("nav button[onclick=\"showPage('home')\"]");
    if (homeBtn) homeBtn.click();
    else window.location.hash = '';
  });

  let confettiInterval = null;
  function startConfetti() {
    confCanvas.classList.remove('hidden');
    const ctx = confCanvas.getContext('2d');
    confCanvas.width = window.innerWidth;
    confCanvas.height = window.innerHeight;
    const pieces = [];
    const colors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#adb5bd', '#6c757d'];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * confCanvas.width,
        y: Math.random() * -confCanvas.height,
        w: 8 + Math.random() * 12,
        h: 10 + Math.random() * 14,
        r: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 1 + Math.random() * 2,
        rotSpeed: (Math.random() - 0.5) * 6
      });
    }

    function draw() {
      ctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
      for (const p of pieces) {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 1.5;
        p.r += p.rotSpeed * 0.02;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > confCanvas.height + 30) {
          p.y = -20 - Math.random() * confCanvas.height;
          p.x = Math.random() * confCanvas.width;
        }
      }
    }

    confettiInterval = setInterval(draw, 1000 / 60);
  }

  function stopConfetti() {
    confCanvas.classList.add('hidden');
    if (confettiInterval) { clearInterval(confettiInterval); confettiInterval = null; }
  }

  let audioCtx, osc;
  function playChime() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.02);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 5);
      setTimeout(() => { if (osc) osc.stop(); }, 5500);
    } catch (e) { }
  }
  function stopChime() {
    try { if (osc) { osc.stop(); osc = null; } if (audioCtx) { audioCtx.close(); audioCtx = null; } } catch (e) { }
  }

  setTimeout(() => {
    const first = s1.querySelector('.choice');
    if (first) first.focus();
  }, 350);

  window.addEventListener('resize', () => {
    if (!confCanvas.classList.contains('hidden')) {
      confCanvas.width = window.innerWidth;
      confCanvas.height = window.innerHeight;
    }
  });

  window.addEventListener('pagehide', () => { stopConfetti(); stopChime(); });
})();

// Main page JavaScript

const mensagens = [
  "Fábia, que este novo ano da sua vida seja cheio de vitórias, saúde, amor e muitos sonhos realizados!",
  "Você é uma pessoa iluminada, de coração puro e sorriso que transforma qualquer dia em algo especial.",
  "Nunca duvide da sua força. Você é capaz de coisas incríveis, mesmo nos dias em que não se sente assim.",
  "Que Deus te cubra de bênçãos hoje e sempre, te guiando por caminhos de paz e felicidade.",
  "Nos dias difíceis, lembre-se que tudo passa, mas a sua luz permanece.",
  "Que a sua vida seja leve, colorida e cheia de momentos que aquecem o coração.",
  "Conselho de amigo: acredite mais em você, porque você já é incrível do jeito que é.",
  "Que nunca lhe falte amor, carinho, amigos verdadeiros e motivos para sorrir.",
  "Parabéns, Fábia! Que cada novo dia seja um presente maravilhoso para a sua vida!"
];

let indiceMensagem = 0;
const elementoMensagem = document.getElementById('mensagemRotativa');

function mostrarMensagem() {
  elementoMensagem.textContent = mensagens[indiceMensagem];
  indiceMensagem = (indiceMensagem + 1) % mensagens.length;
}

function proximaMensagem() {
  mostrarMensagem();
}

mostrarMensagem();
setInterval(mostrarMensagem, 5000);

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  
  // Update active button in nav
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('nav-active'));
  document.querySelector(`nav button[onclick="showPage('${id}')"]`).classList.add('nav-active');
}

// Old carousel functions - kept for compatibility but using new carousel
let slides = [];
let indexSlide = 0;

function trocarSlide() {
  // Auto-rotation handled by CSS animation
}

// Gallery thumbnail navigation
function goToSlide(index) {
  selectImage(index);
}

// Gallery thumbnail navigation
function goToSlide(index) {
  selectImage(index);
}

const images = [
  'img/01.jpg', 'img/02.jpg', 'img/03.jpg', 'img/04.jpg',
  'img/05.jpg', 'img/06.JPG', 'img/07.jpg', 'img/08.JPG',
  'img/09.jpg', 'img/10.JPG', 'img/11.JPG', 'img/12.jpg'
];

const defaultImages = [...images]; // Keep a copy of default images
let currentImageIndex = 0;
let isRemoveMode = false;

// Music functionality
const defaultSongs = [
  { title: 'Flor que Não Murcha', artist: 'Misericórida', src: 'music/Flor que Não Murcha.mp3' },
  { title: 'Bênçãos Que Não Têm Fim', artist: 'Isadora Pompeo', src: 'music/Isadora Pompeo - Bênçãos Que Não Têm Fim.mp3' },
  { title: 'Eu Sei Que Vem', artist: 'Isadora Pompeo', src: 'music/Isadora Pompeo - Eu Sei Que Vem.mp3' }
];

let songs = [...defaultSongs];
let currentSongIndex = 0;
let isRemoveMusicMode = false;

// Music persistence
let addedSongs = [];

// Load saved songs from localStorage
function loadSavedSongs() {
  const saved = localStorage.getItem('fabiaPlaylistSongs');
  if (saved) {
    try {
      addedSongs = JSON.parse(saved);
      // Add saved songs to the songs array
      songs.push(...addedSongs);
    } catch (e) {
      console.error('Error loading saved songs:', e);
      addedSongs = [];
    }
  }
}

// Save songs to localStorage
function saveSongs() {
  localStorage.setItem('fabiaPlaylistSongs', JSON.stringify(addedSongs));
}

// Gallery persistence
let addedImages = [];

// Load saved images from localStorage
function loadSavedImages() {
  const saved = localStorage.getItem('fabiaGalleryImages');
  if (saved) {
    try {
      addedImages = JSON.parse(saved);
      // Add saved images to the images array
      images.push(...addedImages);
    } catch (e) {
      console.error('Error loading saved images:', e);
      addedImages = [];
    }
  }
}

// Save images to localStorage
function saveImages() {
  localStorage.setItem('fabiaGalleryImages', JSON.stringify(addedImages));
}

function selectImage(index) {
  if (isRemoveMode) {
    removePhoto(index);
    return;
  }
  if (index >= 0 && index < images.length) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[index];
      mainImage.style.opacity = '1';
      document.getElementById('carouselIndex').textContent = `Imagem ${index + 1} de ${images.length}`;
      
      // Update active slide indicator
      updateActiveSlide(index);
    }, 300);
  }
}

function randomImageTransition() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * images.length);
  } while (newIndex === currentImageIndex && images.length > 1);
  selectImage(newIndex);
}

function updateActiveSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function updateCarousel() {
  const carouselTrack = document.getElementById('carouselTrack');
  carouselTrack.innerHTML = '';
  
  // Add all images (default + added)
  images.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.onclick = () => selectImage(index);
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Foto ${index + 1}`;
    slide.appendChild(img);
    carouselTrack.appendChild(slide);
  });
  
  // Duplicate for continuous scroll
  images.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.onclick = () => selectImage(index);
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Foto ${index + 1}`;
    slide.appendChild(img);
    carouselTrack.appendChild(slide);
  });
  
  updateActiveSlide(currentImageIndex);
  document.getElementById('carouselIndex').textContent = `Imagem ${currentImageIndex + 1} de ${images.length}`;
}

// Modal functions
function openModal(imgSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = 'flex';
  modalImg.src = imgSrc;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
}

// Close modal on click outside
document.getElementById('imageModal').onclick = (event) => {
  if (event.target === document.getElementById('imageModal')) {
    closeModal();
  }
};

// Close modal on escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function updateThumbnails() {
  // No longer needed with simple carousel
}

// Add and Remove Photos
function addPhoto() {
  const fileInput = document.getElementById('fileInput');
  fileInput.value = '';
  fileInput.click();
  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const imageName = file.name;
        
        // Add to images array and addedImages for persistence
        images.push(dataUrl);
        addedImages.push({
          src: dataUrl,
          name: imageName
        });
        
        // Save to localStorage
        saveImages();
        
        updateCarousel();
        selectImage(images.length - 1);
      };
      reader.readAsDataURL(file);
    }
  };
}

function toggleRemoveMode() {
  isRemoveMode = !isRemoveMode;
  const button = document.querySelector('.gallery-controls button:nth-child(2)');
  const info = document.querySelector('.carousel-info .mode-text');
  if (isRemoveMode) {
    button.textContent = 'Cancelar Remoção';
    button.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    if (info) info.textContent = 'Clique em uma miniatura para remover.';
  } else {
    button.textContent = 'Remover Foto';
    button.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
    if (info) info.textContent = '';
  }
}

function removePhoto(index) {
  if (images.length > 1) {
    // Check if the image being removed is from the default images or added images
    const defaultImageCount = defaultImages.length;
    
    images.splice(index, 1);
    if (currentImageIndex >= images.length) {
      currentImageIndex = images.length - 1;
    }
    
    // If removing an added image, also remove from addedImages array
    if (index >= defaultImageCount) {
      const addedImageIndex = index - defaultImageCount;
      if (addedImageIndex >= 0 && addedImageIndex < addedImages.length) {
        addedImages.splice(addedImageIndex, 1);
        saveImages();
      }
    }
    
    updateCarousel();
    selectImage(currentImageIndex);
  } else {
    alert('Não é possível remover a última imagem.');
  }
  toggleRemoveMode();
}

// Memo functionality
function saveMemo() {
  const memoText = document.getElementById('memoText').value;
  const memoDisplay = document.getElementById('memoDisplay');
  
  if (memoText.trim()) {
    // Save to localStorage
    localStorage.setItem('fabiaMemo', memoText);
    
    // Display on page
    memoDisplay.textContent = memoText;
    document.getElementById('memoText').value = '';
    
    alert('Memorando guardado com sucesso!');
  } else {
    alert('Por favor, escreve algo no memorando.');
  }
}

// Load memo from localStorage on page load
function loadMemo() {
  const savedMemo = localStorage.getItem('fabiaMemo');
  if (savedMemo) {
    document.getElementById('memoDisplay').textContent = savedMemo;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadMemo();
  
  // Load saved images, songs, and memos from localStorage
  loadSavedImages();
  loadSavedSongs();
  loadMemos();
  
  // Initialize carousel
  updateCarousel();
  
  // Initialize playlist
  updatePlaylist();
  
  // Initialize memos display
  displayMemos();
  
  // Add click to main image to open modal
  document.getElementById('mainImage').onclick = () => openModal(images[currentImageIndex]);
  
  // Set initial active button
  document.querySelector("nav button[onclick=\"showPage('home')\"]").classList.add('nav-active');
  
  // Start random image transitions every 5 seconds
  setInterval(randomImageTransition, 5000);
  
  // Close modals when clicking outside
  window.onclick = (event) => {
    const memoModal = document.getElementById('memoModal');
    const viewMemoModal = document.getElementById('viewMemoModal');
    const imageModal = document.getElementById('imageModal');
    
    if (event.target === memoModal) {
      closeMemoModal();
    }
    if (event.target === viewMemoModal) {
      closeViewModal();
    }
    if (event.target === imageModal) {
      closeModal();
    }
  };
});

// Music player functionality
let currentPlayingButton = null;

function playMusic(src, button) {
  if (isRemoveMusicMode) return;
  
  const audioPlayer = document.getElementById('audioPlayer');
  
  if (currentPlayingButton === button) {
    // Same button clicked - toggle play/pause
    if (audioPlayer.paused) {
      audioPlayer.play();
      button.textContent = 'Pausar';
    } else {
      audioPlayer.pause();
      button.textContent = 'Reproduzir';
    }
  } else {
    // Different button clicked - play new song
    if (currentPlayingButton) {
      currentPlayingButton.textContent = 'Reproduzir';
      currentPlayingButton.closest('.playlist-item').classList.remove('playing');
    }
    
    audioPlayer.src = src;
    audioPlayer.play();
    button.textContent = 'Pausar';
    button.closest('.playlist-item').classList.add('playing');
    currentPlayingButton = button;
  }
}

// Handle audio end
document.getElementById('audioPlayer').addEventListener('ended', () => {
  if (currentPlayingButton) {
    currentPlayingButton.textContent = 'Reproduzir';
    currentPlayingButton.closest('.playlist-item').classList.remove('playing');
    currentPlayingButton = null;
  }
});

// Music management functions
function addMusic() {
  const fileInput = document.getElementById('musicFileInput');
  fileInput.value = '';
  fileInput.click();
  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const fileName = file.name.replace(/\.(mp3|wav|ogg)$/i, '');
        const title = fileName.split(' - ')[1] || fileName;
        const artist = fileName.split(' - ')[0] || 'Artista Desconhecido';
        
        const newSong = {
          title: title,
          artist: artist,
          src: dataUrl
        };
        
        // Add to songs array and addedSongs for persistence
        songs.push(newSong);
        addedSongs.push(newSong);
        
        // Save to localStorage
        saveSongs();
        
        updatePlaylist();
      };
      reader.readAsDataURL(file);
    }
  };
}

function toggleRemoveMusicMode() {
  isRemoveMusicMode = !isRemoveMusicMode;
  const button = document.querySelector('.music-controls button:nth-child(2)');
  if (isRemoveMusicMode) {
    button.textContent = 'Cancelar Remoção';
    button.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
  } else {
    button.textContent = 'Remover Música';
    button.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
  }
  updatePlaylist();
}

function removeMusic(index) {
  if (songs.length > 1) {
    // Check if the song being removed is from the default songs or added songs
    const defaultSongCount = defaultSongs.length;
    
    songs.splice(index, 1);
    
    // If removing an added song, also remove from addedSongs array
    if (index >= defaultSongCount) {
      const addedSongIndex = index - defaultSongCount;
      if (addedSongIndex >= 0 && addedSongIndex < addedSongs.length) {
        addedSongs.splice(addedSongIndex, 1);
        saveSongs();
      }
    }
    
    updatePlaylist();
  } else {
    alert('Não é possível remover a última música.');
  }
  toggleRemoveMusicMode();
}

function updatePlaylist() {
  const playlist = document.getElementById('playlist');
  playlist.innerHTML = '';
  
  songs.forEach((song, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    
    if (isRemoveMusicMode) {
      item.onclick = () => removeMusic(index);
      item.style.cursor = 'pointer';
      item.innerHTML = `
        <div class="track-info">
          <div class="track-title">${song.title}</div>
          <div class="track-artist">${song.artist}</div>
        </div>
        <button class="play-btn" style="background: #dc3545;">Remover</button>
      `;
    } else {
      item.innerHTML = `
        <div class="track-info">
          <div class="track-title">${song.title}</div>
          <div class="track-artist">${song.artist}</div>
        </div>
        <button class="play-btn" onclick="playMusic('${song.src}', this)">Reproduzir</button>
      `;
    }
    
    playlist.appendChild(item);
  });
}

// ============ DIARY/MEMORANDO SYSTEM ============

// Diary data
let memos = [];
let currentEditingId = null;

// Load memos from localStorage
function loadMemos() {
  const saved = localStorage.getItem('fabiaDiaryMemos');
  if (saved) {
    try {
      memos = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading memos:', e);
      memos = [];
    }
  }
}

// Save memos to localStorage
function saveMemos() {
  localStorage.setItem('fabiaDiaryMemos', JSON.stringify(memos));
}

// Open memo creation modal
function openMemoModal() {
  currentEditingId = null;
  document.getElementById('memoForm').reset();
  document.getElementById('modalTitle').textContent = 'Criar Novo Memorando';
  document.getElementById('memoModal').classList.add('show');
  document.getElementById('memoImagePreview').innerHTML = '';
  document.getElementById('memoAudioPreview').innerHTML = '';
  
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('memoItemDate').value = today;
}

// Close memo modal
function closeMemoModal() {
  document.getElementById('memoModal').classList.remove('show');
}

// Close view modal
function closeViewModal() {
  document.getElementById('viewMemoModal').classList.remove('show');
}

// Preview image
function previewMemoImage() {
  const input = document.getElementById('memoImageInput');
  const preview = document.getElementById('memoImagePreview');
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Preview audio
function previewMemoAudio() {
  const input = document.getElementById('memoAudioInput');
  const preview = document.getElementById('memoAudioPreview');
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<audio controls style="width: 100%;"><source src="${e.target.result}"></audio>`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Save memo item
function saveMemoItem(event) {
  event.preventDefault();
  
  const title = document.getElementById('memoItemTitle').value;
  const category = document.getElementById('memoItemCategory').value;
  const date = document.getElementById('memoItemDate').value;
  const emotion = document.querySelector('input[name="emotion"]:checked')?.value || 'Feliz';
  const content = document.getElementById('memoItemContent').value;
  const isPrivate = document.getElementById('memoPrivate').checked;
  
  let image = null;
  let audio = null;
  
  // Get image data URL
  const imageInput = document.getElementById('memoImageInput');
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image = e.target.result;
      saveAudio();
    };
    reader.readAsDataURL(imageInput.files[0]);
    return; // Continue with saveAudio
  } else {
    saveAudio();
  }
  
  function saveAudio() {
    const audioInput = document.getElementById('memoAudioInput');
    if (audioInput.files && audioInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        audio = e.target.result;
        finalSave();
      };
      reader.readAsDataURL(audioInput.files[0]);
    } else {
      finalSave();
    }
  }
  
  function finalSave() {
    if (currentEditingId) {
      // Update existing memo
      const memoIndex = memos.findIndex(m => m.id === currentEditingId);
      if (memoIndex >= 0) {
        memos[memoIndex] = {
          id: currentEditingId,
          title,
          category,
          date,
          emotion,
          content,
          image: image || memos[memoIndex].image,
          audio: audio || memos[memoIndex].audio,
          isPrivate,
          createdAt: memos[memoIndex].createdAt,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      // Create new memo
      const newMemo = {
        id: Date.now().toString(),
        title,
        category,
        date,
        emotion,
        content,
        image,
        audio,
        isPrivate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memos.unshift(newMemo);
    }
    
    saveMemos();
    closeMemoModal();
    displayMemos();
  }
}

// Edit memo
function editMemo(id) {
  const memo = memos.find(m => m.id === id);
  if (!memo) return;
  
  currentEditingId = id;
  
  // Fill form with memo data
  document.getElementById('memoItemTitle').value = memo.title;
  document.getElementById('memoItemCategory').value = memo.category;
  document.getElementById('memoItemDate').value = memo.date;
  document.getElementById('memoItemContent').value = memo.content;
  document.getElementById('memoPrivate').checked = memo.isPrivate;
  
  // Set emotion radio
  const emotionRadio = document.querySelector(`input[name="emotion"][value="${memo.emotion}"]`);
  if (emotionRadio) emotionRadio.checked = true;
  
  // Show existing image if any
  const imagePreview = document.getElementById('memoImagePreview');
  if (memo.image) {
    imagePreview.innerHTML = `<img src="${memo.image}" alt="Preview">`;
  }
  
  // Show existing audio if any
  const audioPreview = document.getElementById('memoAudioPreview');
  if (memo.audio) {
    audioPreview.innerHTML = `<audio controls style="width: 100%;"><source src="${memo.audio}"></audio>`;
  }
  
  document.getElementById('modalTitle').textContent = 'Editar Memorando';
  document.getElementById('memoModal').classList.add('show');
}

// Delete memo
function deleteMemo(id) {
  if (confirm('Tem certeza que quer apagar este memorando?')) {
    memos = memos.filter(m => m.id !== id);
    saveMemos();
    displayMemos();
  }
}

// View memo full content
function viewMemo(id) {
  const memo = memos.find(m => m.id === id);
  if (!memo) return;
  
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('pt-PT', options);
  };
  
  let html = `
    <div class="memo-title">${memo.title}</div>
    <div class="memo-meta">
      <span>${formatDate(memo.date)}</span>
      <span>${memo.emotion}</span>
      <span>${memo.category}</span>
      ${memo.isPrivate ? '<span>Privado</span>' : ''}
    </div>
  `;
  
  if (memo.image) {
    html += `<img src="${memo.image}" class="memo-image" alt="Memória">`;
  }
  
  html += `<div class="memo-content">${memo.content}</div>`;
  
  if (memo.audio) {
    html += `<audio controls style="width: 100%;"><source src="${memo.audio}"></audio>`;
  }
  
  html += `
    <div class="memo-actions" style="margin-top: 20px;">
      <button onclick="editMemo('${id}')">✏️ Editar</button>
      <button class="delete-btn" onclick="deleteMemo('${id}')">🗑️ Apagar</button>
      <button onclick="closeViewModal()">Fechar</button>
    </div>
  `;
  
  document.getElementById('viewMemoContent').innerHTML = html;
  document.getElementById('viewMemoModal').classList.add('show');
}

// Display memos in list
function displayMemos() {
  const memosList = document.getElementById('memosList');
  
  if (memos.length === 0) {
    memosList.innerHTML = '<div class="empty-state"><p>Comece criando seu primeiro memorando!</p></div>';
    return;
  }
  
  let html = '';
  memos.forEach(memo => {
    const preview = memo.content.substring(0, 100) + (memo.content.length > 100 ? '...' : '');
    const formatDate = (dateStr) => {
      const options = { month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('pt-PT', options);
    };
    
    html += `
      <div class="memo-item">
        <div class="memo-header">
          <div>
            <div class="memo-title">${memo.title}</div>
            <div class="memo-category">${memo.category}</div>
          </div>
        </div>
        <div class="memo-meta">
          <span>${formatDate(memo.date)}</span>
          <span class="memo-emotion">${memo.emotion}</span>
          ${memo.isPrivate ? '<span>Privado</span>' : ''}
          ${memo.image ? '<span>Foto</span>' : ''}
          ${memo.audio ? '<span>Audio</span>' : ''}
        </div>
        <div class="memo-preview">${preview}</div>
        ${memo.image ? `<img src="${memo.image}" class="memo-image" alt="Foto">` : ''}
        <div class="memo-actions">
          <button onclick="viewMemo('${memo.id}')">Ver</button>
          <button onclick="editMemo('${memo.id}')">Editar</button>
          <button class="delete-btn" onclick="deleteMemo('${memo.id}')">Apagar</button>
        </div>
      </div>
    `;
  });
  
  memosList.innerHTML = html;
}

// Filter memos
function filterMemos() {
  const searchTerm = document.getElementById('searchMemo').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  
  const filtered = memos.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchTerm) || 
                         memo.content.toLowerCase().includes(searchTerm);
    const matchesCategory = !categoryFilter || memo.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const memosList = document.getElementById('memosList');
  
  if (filtered.length === 0) {
    memosList.innerHTML = '<div class="empty-state"><p>Nenhum memorando encontrado.</p></div>';
    return;
  }
  
  let html = '';
  filtered.forEach(memo => {
    const preview = memo.content.substring(0, 100) + (memo.content.length > 100 ? '...' : '');
    const formatDate = (dateStr) => {
      const options = { month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('pt-PT', options);
    };
    
    html += `
      <div class="memo-item">
        <div class="memo-header">
          <div>
            <div class="memo-title">${memo.title}</div>
            <div class="memo-category">${memo.category}</div>
          </div>
        </div>
        <div class="memo-meta">
          <span>${formatDate(memo.date)}</span>
          <span class="memo-emotion">${memo.emotion}</span>
          ${memo.isPrivate ? '<span>Privado</span>' : ''}
          ${memo.image ? '<span>Foto</span>' : ''}
          ${memo.audio ? '<span>Audio</span>' : ''}
        </div>
        <div class="memo-preview">${preview}</div>
        ${memo.image ? `<img src="${memo.image}" class="memo-image" alt="Foto">` : ''}
        <div class="memo-actions">
          <button onclick="viewMemo('${memo.id}')">Ver</button>
          <button onclick="editMemo('${memo.id}')">Editar</button>
          <button class="delete-btn" onclick="deleteMemo('${memo.id}')">Apagar</button>
        </div>
      </div>
    `;
  });
  
  memosList.innerHTML = html;
}