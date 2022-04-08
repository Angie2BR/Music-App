const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
// const currTime = document.querySelector('#currTime');
// const durTime = document.querySelector('#durTime');

// Song titles:

const songs = [
	"Billie_Eilish_Oxytocin",
	"Happier-Than-Ever",
	"Hold-On Adele",
	"Lil-Nas",
];

//keep track of song:

let songIndex = 1;

// Initiall load of song details into DOM:
loadSong(songs[songIndex]);

// update song details:

function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Play song:
function playSong() {
	musicContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");

	audio.play();
}

//pause song:

function pauseSong() {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");

	audio.pause();
}

// play previous song:

function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
}

//play next song:

function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

//set progress bar:

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

//change the point at which the song is playing:

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

// Add Event listeners:

//play button:

playBtn.addEventListener("click", () => {
	const isPlaying = musicContainer.classList.contains("play");
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// change song:
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//updates the song duration time
audio.addEventListener("timeupdate", updateProgress);

//fastforward or reverse the song by clicking the progess bar
progressContainer.addEventListener("click", setProgress);

//when current song ends, play next song:
audio.addEventListener("ended", nextSong);
