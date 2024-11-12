let songList = document.querySelector("#song-list");
let progress = document.querySelector("#progress");
let playBtn = document.querySelector("#play-btn");
let backBtn = document.querySelector("#back-btn");
let frwdBtn = document.querySelector("#frwd-btn");
let nowPlayingDiv = document.querySelector("#now-playing");

let songs = [
  { name: "song1", id: 1 },
  { name: "song2", id: 2 },
  { name: "song3", id: 3 },
  { name: "song4", id: 4 }
];

let audio = new Audio(); 
let currentSongId = null;

// Display all the songs in the list
for (let song of songs) {
  const li = document.createElement("li");
  li.innerText = song.name;
  li.setAttribute("id", song.id);
  songList.append(li);
}

// Play/Pause button functionality
playBtn.addEventListener("click", function () {
  if (currentSongId === null) {
    alert("Please select a song first!");
    return;  
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  if (playBtn.children[0].classList.contains("fa-play")) {
    playBtn.children[0].classList.remove("fa-play");
    playBtn.children[0].classList.add("fa-pause");
  } else {
    playBtn.children[0].classList.remove("fa-pause");
    playBtn.children[0].classList.add("fa-play");
  }
});

// Show current progress of the song
audio.addEventListener("timeupdate", function () {
  const currentProgress = (audio.currentTime * 100) / audio.duration;
  progress.value = currentProgress;
});

// Update song time based on progress bar input
progress.addEventListener("change", function () {
  const updatedTime = (progress.value * audio.duration) / 100;
  audio.currentTime = updatedTime;
});

// Song selection functionality (clicking a song from the list)
songList.addEventListener("click", function (e) {
  let songId = e.target.getAttribute("id");

  // Remove 'playing' class from all songs
  let allSongs = songList.querySelectorAll("li");
  allSongs.forEach(song => song.classList.remove("playing"));

  // Add 'playing' class to the clicked song
  e.target.classList.add("playing");

  // Update the "Now Playing" div with the song name
  nowPlayingDiv.innerText = `${e.target.innerText} is playing`;


  audio.src = `./media/song${songId}.mp3`;
  audio.currentTime = 0;
  audio.play();
  playBtn.children[0].classList.remove("fa-play");
  playBtn.children[0].classList.add("fa-pause");

  currentSongId = songId;
});

// Back button functionality
backBtn.addEventListener("click", function () {
  if (currentSongId === null) {
    alert("Please select a song first!");
    return;
  }

  let songId = parseInt(currentSongId);
  songId = (songs.length + songId - 1) % songs.length;
  if (songId === 0) songId = songs.length;

  // Remove 'playing' class from all songs
  let allSongs = songList.querySelectorAll("li");
  allSongs.forEach(song => song.classList.remove("playing"));

  // Add 'playing' class to the previous song
  const prevSong = document.querySelector(`#song-list li:nth-child(${songId})`);
  prevSong.classList.add("playing");


  // Update the "Now Playing" div with the new song name
  nowPlayingDiv.innerText = `${songs[songId - 1].name} is playing`;

  audio.src = `./media/song${songId}.mp3`;
  audio.currentTime = 0;
  audio.play();
  playBtn.children[0].classList.remove("fa-play");
  playBtn.children[0].classList.add("fa-pause");

  // Update currentSongId
  currentSongId = songId;
});

// Forward button functionality
frwdBtn.addEventListener("click", function () {
  if (currentSongId === null) {
    alert("Please select a song first!");
    return;
  }

  let songId = parseInt(currentSongId);
  songId = (songId % songs.length) + 1;

  // Remove 'playing' class from all songs
  let allSongs = songList.querySelectorAll("li");
  allSongs.forEach(song => song.classList.remove("playing"));

  // Add 'playing' class to the next song
  const nextSong = document.querySelector(`#song-list li:nth-child(${songId})`);
  nextSong.classList.add("playing");

  // Update the "Now Playing" div with the new song name
  nowPlayingDiv.innerText = `${songs[songId - 1].name} is playing`;

  audio.src = `./media/song${songId}.mp3`;
  audio.currentTime = 0;
  audio.play();
  playBtn.children[0].classList.remove("fa-play");
  playBtn.children[0].classList.add("fa-pause");

  // Update currentSongId
  currentSongId = songId;
});
