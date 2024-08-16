//!HTML ELEMENT TO REACHES
let mainContainer = document.querySelector(".main-container");
let musicNumber = document.querySelector(".music-number");
let image = document.getElementById("image");
let audio = document.getElementById("audio");
let title = document.getElementById("title");
let singer = document.getElementById("singer");

let startTime = document.getElementById("startTime");
let progrresBar = document.getElementById("progrresBar");
let finishTime = document.getElementById("finishTime");

let volumeIcon = document.getElementById("volumeIcon");
let volumeBar = document.getElementById("volumeBar");
let volumeValue = document.getElementById("volumeValue");

let backward = document.getElementById("backward");
let prev = document.getElementById("prev");
let play = document.getElementById("play");
let next = document.getElementById("next");
let forward = document.getElementById("forward");

let openMusicMenu = document.getElementById("openMusicMenu");
let closeMusicMenu = document.getElementById("closeMusicMenu");
let sidebarRow = document.querySelector(".sidebar-row");

const player = new MusicPlayer(musicList);

//!PAGE LOADED GET FIRST MUSIC
window.addEventListener("load", () => {
    displayMusic(player.getMusic());
    displayMusicList(player.musicList);
    isPlayingNow()
    musicNumber.innerHTML = `<span id="musicNumber">Müzik sırası ${player.index +1}/${player.musicList.length}</span>`;
});

//!SHOW MUSIC LIST
const displayMusic = (music) => {
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.audio;
    title.textContent = music.title;
    singer.textContent = music.singer;
};

play.addEventListener("click", () => {
    mainContainer.classList.contains("playing") ? pauseMusic() : playMusic();
});

//!PAUSE MUSIC
const pauseMusic = () => {
    mainContainer.classList.remove("playing");
    play.classList = "fa-solid fa-circle-play";
    musicNumber.innerHTML = `<span id="musicNumber">Duraklatıldı ${player.index *1 +1}/${player.musicList.length}</span>`;
    image.style.animationPlayState = "paused"
    audio.pause();
};

//!PLAY MUSIC
const playMusic = () => {
    mainContainer.classList.add("playing");
    play.classList = "fa-solid fa-circle-pause";
    image.style.animationName = "turned"
    musicNumber.innerHTML = `<span id="musicNumber">Oynatılıyor ${player.index +1}/${player.musicList.length}</span>`;
    image.style.animationPlayState = "running"
    audio.play();
};

//!PREV MUSIC
prev.addEventListener("click", () => {
    player.prev();
    isPlayingNow()
    musicNumber.innerHTML = `<span id="musicNumber">Müzik sırası ${player.index +1}/${player.musicList.length}</span>`;
    displayMusic(player.getMusic());
    playMusic();
});

//!NEXT MUSIC
next.addEventListener("click", () => {
    player.next();
    displayMusic(player.getMusic());
    musicNumber.innerHTML = `<span id="musicNumber">Müzik sırası ${player.index +1}/${player.musicList.length}</span>`;
    isPlayingNow()
    playMusic();
});

//!BACKWARD TEN SECONDS CURRENTTIME
backward.addEventListener("click", () => {
    audio.currentTime -=10
});

//!FORWARD TEN SECONDS CURRENTTIME
forward.addEventListener("click", () => {
    audio.currentTime +=10
});

const calculateTime = (totalSeconds) => {
    const minute = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const updateSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const conclusion = `${minute}:${updateSeconds}`;
    return conclusion;
};

audio.addEventListener("loadedmetadata", () => {
    finishTime.textContent = calculateTime(audio.duration);
    progrresBar.max = Math.floor(audio.duration);
});

//!MUSIC TIME UPDATE
audio.addEventListener("timeupdate", () => {
    progrresBar.value = Math.floor(audio.currentTime);
    startTime.textContent = calculateTime(progrresBar.value);
});

audio.addEventListener("ended", () => {
    player.next();
    isPlayingNow();
    musicNumber.innerHTML = `<span id="musicNumber">Müzik sırası ${player.index +1}/${player.musicList.length}</span>`;
    displayMusic(player.getMusic())
    audio.play();
})

//!USER CLICKED PROGRRES BAR AND MUSIC CURRENTTIME IS NEXT
progrresBar.addEventListener("input", () => {
    startTime.textContent = calculateTime(progrresBar.value)
    audio.currentTime = Math.floor(progrresBar.value)
});

volumeBar.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100
    volumeValue.textContent = e.target.value

    if(audio.volume <= 0) {
        volumeIcon.classList = "fa-solid fa-volume-xmark"
    } else if(audio.volume <= 0.10) {
        volumeIcon.classList = "fa-solid fa-volume-off"
    } else if(audio.volume <= 0.5) {
        volumeIcon.classList = "fa-solid fa-volume-low"
    } else {
        volumeIcon.classList = "fa-solid fa-volume-high"
    }
});

volumeIcon.addEventListener("click", () => {
    if(audio.muted) {
        audio.muted = false;
        volumeBar.value = 100;
        volumeIcon.classList = "fa-solid fa-volume-high"
    } else{
        audio.muted = true;
        volumeBar.value = 0;
        volumeIcon.classList = "fa-solid fa-volume-xmark"
    }
});

const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++) {
        let musicList = `
            <div class="sidebar-col" col-index="${i}" onclick="selectedMusic(this)">
                <img src="img/${list[i].img}" alt="">
                <audio id="audio-${i}" src="mp3/${list[i].audio}"><audio>
            </div>
        `;

        sidebarRow.insertAdjacentHTML("beforeend", musicList);

    }
};

const selectedMusic = (music) => {
    player.index = music.getAttribute("col-index");
    isPlayingNow()
    displayMusic(player.getMusic());
    playMusic()
    musicNumber.innerHTML = `<span id="musicNumber">Oynatılıyor ${music.getAttribute("col-index")*1 +1}/${player.musicList.length}</span>`;
};

const isPlayingNow = () => {
    for(let music of sidebarRow.querySelectorAll(".sidebar-col")) {
        if(music.classList.contains("playing")) {
            music.classList.remove("playing")
        };

        if(music.getAttribute("col-index") == player.index) {
            music.classList.add("playing")
        }
    }
};

//!OPEN MUSIC MENU
openMusicMenu.addEventListener("click", () => {
    sidebarRow.classList.add("open")
});

//!CLOSE MUSIC MENU
closeMusicMenu.addEventListener("click", () => {
    sidebarRow.classList.remove("open")
});