// Surprise Page JavaScript - Emotional Revelation Experience
(function() {
  let surpriseMusic = null;
  let isMusicPlaying = false;

  // Gallery messages for each image
  const galleryMessages = [
    {
      title: "O Teu Sorriso",
      message: "Aquele sorriso que aparece nas horas mais inesperadas. É como se o sol resolvesse brilhar no meio da chuva. Ilumina tudo ao redor sem que percebas o quanto és especial."
    },
    {
      title: "A Tua Força Silenciosa",
      message: "Não gritas, não reclama. Apenas segues em frente. É nessa quietude que vejo a tua verdadeira força - aquela que não precisa de aplausos para existir."
    },
    {
      title: "Os Teus Olhos",
      message: "Os teus olhos contam histórias que as palavras não conseguem. Há neles uma profundidade que poucos conseguem ver, mas que transforma quem te conhece."
    },
    {
      title: "Teu Jeito de Cuidar",
      message: "Nos pequenos gestos, no olhar atento, no cuidado silencioso. É aí que mora a tua grandeza: fazer o outro se sentir especial sem esforço, só sendo você."
    }
  ];

  // Hidden messages
  const hiddenMessages = [
    {
      title: "Uma Confissão",
      message: "Às vezes penso que Deus te criou especialmente para mostrar ao mundo como é ser verdadeiramente bom. És um exemplo vivo de que a bondade existe."
    },
    {
      title: "O Que Admiro em Ti",
      message: "Admiro como consegues ser forte sem perder a doçura. Como manténs a fé mesmo nos dias mais difíceis. Como amas sem esperar nada em troca."
    },
    {
      title: "Um Segredo",
      message: "O teu maior dom não é o que fazes, mas quem és. És uma pessoa que deixa o mundo melhor só por existir. Isso é raro e precioso."
    }
  ];

  // Open surprise - transition from entrance to content
  window.openSurprise = function() {
    const entrance = document.getElementById('surprise-entrance');
    const content = document.getElementById('surprise-content');

    entrance.classList.remove('entrance-active');
    entrance.classList.add('content-hidden');

    setTimeout(() => {
      entrance.style.display = 'none';
      content.classList.remove('content-hidden');
      content.classList.add('content-active');

      // Start music automatically
      startSurpriseMusic();
    }, 1000);
  };

  // Music control functions
  function startSurpriseMusic() {
    surpriseMusic = document.getElementById('surpriseMusic');
    if (surpriseMusic) {
      surpriseMusic.volume = 0.3; // Soft volume
      surpriseMusic.play().then(() => {
        isMusicPlaying = true;
        updateMusicButton();
      }).catch(() => {
        // Handle autoplay restrictions
        console.log('Autoplay blocked - user interaction required');
      });
    }
  }

  window.toggleSurpriseMusic = function() {
    if (!surpriseMusic) return;

    if (isMusicPlaying) {
      surpriseMusic.pause();
      isMusicPlaying = false;
    } else {
      surpriseMusic.play();
      isMusicPlaying = true;
    }
    updateMusicButton();
  };

  function updateMusicButton() {
    const icon = document.getElementById('musicIcon');
    const text = document.getElementById('musicText');

    if (icon && text) {
      if (isMusicPlaying) {
        icon.textContent = '🎵';
        text.textContent = 'Pausar Música';
      } else {
        icon.textContent = '🔇';
        text.textContent = 'Tocar Música';
      }
    }
  }

  // Gallery message functions
  window.showGalleryMessage = function(index) {
    if (index >= galleryMessages.length) return;

    const message = galleryMessages[index];
    const modal = document.getElementById('galleryModal');
    const content = document.getElementById('galleryMessageContent');

    content.innerHTML = `
      <h3 style="color: #ff69b4; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">${message.title}</h3>
      <p style="line-height: 1.6; color: #4a4a4a; font-style: italic;">${message.message}</p>
    `;

    modal.classList.add('show');
  };

  window.closeGalleryModal = function() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
  };

  // Hidden message functions
  window.revealHiddenMessage = function(index) {
    if (index >= hiddenMessages.length) return;

    const message = hiddenMessages[index];
    const modal = document.getElementById('hiddenMessageModal');
    const content = document.getElementById('hiddenMessageContent');

    content.innerHTML = `
      <h3 style="color: #ff69b4; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">${message.title}</h3>
      <p style="line-height: 1.6; color: #4a4a4a; font-style: italic;">${message.message}</p>
    `;

    modal.classList.add('show');

    // Add a subtle animation to the clue that was clicked
    const clues = document.querySelectorAll('.message-clue');
    if (clues[index]) {
      clues[index].style.animation = 'none';
      setTimeout(() => {
        clues[index].style.animation = 'gentlePulse 2s ease-in-out';
      }, 10);
    }
  };

  window.closeHiddenMessageModal = function() {
    const modal = document.getElementById('hiddenMessageModal');
    modal.classList.remove('show');
  };

  // Close modals when clicking outside
  document.addEventListener('click', function(event) {
    const galleryModal = document.getElementById('galleryModal');
    const hiddenModal = document.getElementById('hiddenMessageModal');

    if (event.target === galleryModal) {
      closeGalleryModal();
    }
    if (event.target === hiddenModal) {
      closeHiddenMessageModal();
    }
  });

  // Handle page navigation to stop music when leaving surprise page
  const originalShowPage = window.showPage;
  window.showPage = function(pageId) {
    // Stop music when leaving surprise page
    if (surpriseMusic && isMusicPlaying) {
      surpriseMusic.pause();
      isMusicPlaying = false;
    }

    // Call original function
    if (originalShowPage) {
      originalShowPage(pageId);
    }
  };

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