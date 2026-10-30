const songs = [

    {
        title: "Dreams",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-dreams.mp3"
    },

    {
        title: "Energy",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-energy.mp3"
    },

    {
        title: "Sunny",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
    },

    {
        title: "Better Days",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3"
    }
];

const audio = document.getElementById("audio");

const title = document.getElementById("song-title");

const artist = document.getElementById("artist");

const playButton = document.getElementById("play-btn");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

const autoplay = document.getElementById("autoplay");

let songIndex = 0;


// Load first song
loadSong(songIndex);


// Load song
function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.src;

    updatePlaylist();

}


// Play song
function playSong() {

    audio.play();

    playButton.textContent = "⏸️";
}


// Pause song
function pauseSong() {

    audio.pause();

    playButton.textContent = "▶️";
}


// Play / Pause
function togglePlay() {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }
}


// Next song
function nextSong() {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

}


// Previous song
function previousSong() {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

}


// Update progress
audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// When song loads
audio.addEventListener("loadedmetadata", function() {

    duration.textContent =
        formatTime(audio.duration);

});


// Change song position
progress.addEventListener("input", function() {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// Volume control
volume.addEventListener("input", function() {

    audio.volume = volume.value;

});


// Set initial volume
audio.volume = volume.value;


// Automatic next song
audio.addEventListener("ended", function() {

    if (autoplay.checked) {

        nextSong();

    } else {

        playButton.textContent = "▶️";

    }

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


// Create playlist
function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${index + 1}. ${song.title} - ${song.artist}`;

        li.addEventListener("click", function() {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });

        playlist.appendChild(li);

    });

}


// Update active playlist item
function updatePlaylist() {

    createPlaylist();

    const items =
        playlist.querySelectorAll("li");

    items.forEach((item, index) => {

        if (index === songIndex) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


// Keyboard controls
document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        event.preventDefault();

        togglePlay();

    }

    if (event.code === "ArrowRight") {

        nextSong();

    }

    if (event.code === "ArrowLeft") {

        previousSong();

    }

});