const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const playlist = document.getElementById('playlist');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist');

// Sample Playlist
const songs = [
  { title: "Smooth Criminal ", artist: "Michael Jackson", src: "audio/Smooth_Criminal.mp3" },
  { title: "Let Her Go ", artist: "Passenger", src: "audio/Let_Her_Go.mp3" },
  { title: "Whenever, Wherever", artist: "Shakira ", src: "audio/Whenever,Wherever.mp3" },
  { title: "Someone You Loved", artist: "Lewis Capaldi ", src: "audio/Someone_You_Loved.mp3" },
  { title: "Cheri Cheri Lady", artist: "Modern Talking ", src: "audio/Cheri_Cheri_Lady.mp3" }
  
];

let currentSongIndex = 0;

// Load a song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.innerText = song.title;
  artistName.innerText = song.artist;
}

// Play and Pause
playBtn.addEventListener('click', () => {
  audio.play();
  playBtn.hidden = true;
  pauseBtn.hidden = false;
});

pauseBtn.addEventListener('click', () => {
  audio.pause();
  playBtn.hidden = false;
  pauseBtn.hidden = true;
});

// Update Progress Bar
audio.addEventListener('timeupdate', () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume Control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Load Initial Song
loadSong(currentSongIndex);
function updatePlaylistUI() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = `${song.title} - ${song.artist}`;
      li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
        playBtn.hidden = true;
        pauseBtn.hidden = false;
      });
      playlist.appendChild(li);
    });
  }
  
  // Add Next and Previous Song Controls
  document.getElementById('next-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  });
  
  document.getElementById('prev-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  });
  
  updatePlaylistUI();
  
  