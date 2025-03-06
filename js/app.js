
import Storage from "./API.js";



let allSongs = Storage.getData(); 
let allFilteredSongs = allSongs; 
let activeSongID = 0; 
let activeSongObject; 
let isSongPlaying = 0; 
let totalTime = 0; 
let isRepeatOn = 0; 
let status = "all"; 

const songsCover = document.querySelector(".songs-cover");
const tracksContainer = document.querySelector(".tracks-container");
const selectedAudioPlayer = document.querySelector(".selected-audio");

const songPlayingSectionModal = document.querySelector(".song-playing-section");
const closeBtn = document.querySelector(".close-btn");

const modalLeftTitle = document.querySelector(".modalLeftTitle");
const modalLeftSinger = document.querySelector(".modalLeftSinger");

const progressBarUi = document.querySelector(
  ".song-playing-section__bottom__progress__self"
);
const modalBackImage = document.querySelector(".modal-back-image");

const togglePlayPause = document.querySelector(".toggle-play-pause");
const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const playBtn = document.querySelector(".playbutton");
const repeatBtn = document.querySelector(".repeatBtn");

const allBtn = document.querySelector(".allBtn");
const favouriteBtn = document.querySelector(".FavouriteBtn");
const favIconModal = document.querySelector(".favIconModal");


const searchBar = document.querySelector(".search-bar");
const selectionSection = document.querySelector(".selection");
const titleModal = document.querySelector(
  ".song-playing-section__top__songTitle"
);

class Ui {
  addToDOM(songs) {
    let coverHTMLS = "";
    songs.forEach((song) => {
      coverHTMLS += this.createCoverHTML(song);
    });
    songsCover.innerHTML = coverHTMLS; 
    let playlistHTML = "";
    songs.forEach((song) => {
      playlistHTML += this.createPlaylistHTML(song);
    });
    tracksContainer.innerHTML = playlistHTML; 

    const allCoversSongs = document.querySelectorAll(".song-cover__self");
    const allPlaylistSongs = document.querySelectorAll(".tracks__self");

    [allCoversSongs, allPlaylistSongs].forEach((item) =>
      item.forEach((song) => {
        song.addEventListener("click", (e) => {
          if (e.target.classList == "tracks__self__right") {
            const favId = e.target.dataset.songid;
            this.favouriteLogic(favId);
          } else {
            activeSongID = Number(e.target.dataset.songid);
            this.openModalwithActiveSong();
          }
        });
      })
    );
  }

  favouriteLogic(favId) {
  
    allSongs.forEach((song) => {
      if (song.id == favId) {
        song.isFavourite = Number(!song.isFavourite);
        allFilteredSongs = allSongs; 
        this.filterSongs(status); // 
      }
    });
    Storage.saveDate(allSongs); 
  }

  createCoverHTML(song) {
    return `
      <div class="song-cover__self" data-songId = "${song.id}">
        <div class="song-cover__self__cover-image">
          <img src= "${song.coverSrc}" />
          <svg class="icon">
            <use xlink:href="./assets/images/sprite.svg#playbutton"></use>
          </svg>
        </div>
        <div class="song-cover__self__text">
          <h2>${song.title}</h2>
          <p>${song.singer}</p>
        </div>
      </div>
    `;
  }

  createPlaylistHTML(song) {
    return `
        <div class="tracks__self" data-songId=${song.id}>
          <div class="tracks__self__left">
            <div class="tracks__self__left__play-icon">
              <svg class="icon">
                <use xlink:href="./assets/images/sprite.svg#playbutton"></use>
              </svg>
            </div>
            <div class="tracks__self__left__text">
              <h2>${song.title}</h2>
              <p>${song.singer}</p>
            </div>
          </div>
          <div class="tracks__self__right" data-songId=${song.id}  >
            <svg class="icon tracks__self__right__icon ${
              song.isFavourite == 1 ? "--fav-selected" : ""
            }" data-songId=${song.id}>
              <use xlink:href="./assets/images/sprite.svg#heart" class="tracks__self__right__icon__self"></use>
            </svg>
          </div>
        </div>
    `;
  }

  filterSongs(status) {
  
    switch (status) {
      case "favourite":
        const favSongs = allSongs.filter((song) => song.isFavourite === 1); 
        allFilteredSongs = favSongs; 
        this.addToDOM(allFilteredSongs); 
        break;

      default:
        allFilteredSongs = allSongs; 
        this.addToDOM(allFilteredSongs); 
        break;
    }
    [allBtn, favouriteBtn].forEach((btn) => {
      if (btn.dataset.filterstatus != status) {
        btn.classList.remove("--selected-Filter");
      } else {
        btn.classList.add("--selected-Filter");
      }
    });
  }

  convertTimeForamt(time){
    function addpad(time) {
      return String(time).padStart(2, "0");
    }

    const convertedTime = `${addpad(Math.floor(time / 60))}:${addpad(
      Math.floor(time % 60)
    )}`;

    return convertedTime;
  }

  openModalwithActiveSong() {
    this.openModal(); // 
    closeBtn.addEventListener("click", this.closeModal); 
    this.updateModalWithActiveSong();
  }

  nextSong() {
    const ui = new Ui();
    let songIndex = allFilteredSongs.findIndex(
      (song) => song.id == activeSongID
    );


    if (songIndex + 1 > allFilteredSongs.length - 1) {
      activeSongID = allFilteredSongs[0].id; 
    } else {
      songIndex += 1;

      activeSongID = allFilteredSongs[songIndex].id; 
    }
    isSongPlaying = 0;
    ui.updateModalWithActiveSong();
  }

  previousSong() {
    const ui = new Ui();

    let songIndex = allFilteredSongs.findIndex(
      (song) => song.id == activeSongID
    );


    if (songIndex - 1 < 0) {
      activeSongID = allFilteredSongs[allFilteredSongs.length - 1].id; 
    } else {
      songIndex -= 1;
      activeSongID = allFilteredSongs[songIndex].id;
    }
    isSongPlaying = 0;

    ui.updateModalWithActiveSong();
  }

  updateModalWithActiveSong() {
    this.findSongWithID(activeSongID);

    selectedAudioPlayer.src = activeSongObject.audioSrc;
    this.playingAndStopingThesong();

    favIconModal.dataset.idofsong = activeSongID;

    
    if (activeSongObject.isFavourite) {
      favIconModal.classList.add("--fav-selected");
    } else {
      favIconModal.classList.remove("--fav-selected");
    }
    lyricsSection.innerHTML = activeSongObject.lyrics;
    modalLeftTitle.textContent = activeSongObject.title;
    modalLeftSinger.textContent = activeSongObject.singer;
    modalBackImage.src = activeSongObject.coverModal;
  }

  findSongWithID(id) {
    const [foundedSong] = allSongs.filter((song) => song.id === id);
    activeSongObject = { ...foundedSong };
  }

  playingAndStopingThesong() {
    if (!isSongPlaying) {
      selectedAudioPlayer.play();
      pauseBtn.classList.remove("--display-none");
      playBtn.classList.add("--display-none");

      isSongPlaying = 1; 
    } else {
      selectedAudioPlayer.pause();
      isSongPlaying = 0;
      playBtn.classList.remove("--display-none");
      pauseBtn.classList.add("--display-none");
    }
  }

  progressBar() {
    selectedAudioPlayer.addEventListener("loadedmetadata", () => {
      totalTime = selectedAudioPlayer.duration;
      const time = this.convertTimeForamt(totalTime);
    });

    selectedAudioPlayer.addEventListener("timeupdate", () => {
      const currentTime = selectedAudioPlayer.currentTime;
      const percent = `${String((currentTime / totalTime) * 100)}%`;
      progressBarUi.style.width = percent;

      if (percent === "100%") {
        if (isRepeatOn) {
          this.repeat();
        } else {
          this.nextSong();
        }
      }
    });
  }

  repeat() {
    isSongPlaying = 0;
    this.updateModalWithActiveSong();
  }

  repeatBtnLogic() {
    if (isRepeatOn) {
      isRepeatOn = 0;
      isRepeatOn = "";
      repeatBtn.classList.remove("--selected");
    } else {
      isRepeatOn = 1;
      isRepeatOn = "repeat";
      repeatBtn.classList.add("--selected");
    }
  }

  searchLogic(target) {
    if (target == "") {
      allFilteredSongs = allSongs;
      selectionSection.classList.remove("--display-none");
      status = "all";
      this.filterSongs(status);
    } else {
      allFilteredSongs = allSongs.filter((song) =>
        song.title.toLowerCase().includes(target)
      );
      selectionSection.classList.add("--display-none");
      this.addToDOM(allFilteredSongs);
    }
  }

  openModal() {
    document.body.classList.add("disableScroll");
    songPlayingSectionModal.classList.remove("--display-none");
  }

  closeModal() {
    songPlayingSectionModal.classList.add("--display-none"); 
    document.body.classList.remove("disableScroll");
    selectedAudioPlayer.src = activeSongObject.audioSrc;
    selectedAudioPlayer.pause();
    selectedAudioPlayer.currentTime = 0;
    isSongPlaying = 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new Ui();
  ui.addToDOM(allSongs);
  togglePlayPause.addEventListener("click", ui.playingAndStopingThesong);
  nextBtn.addEventListener("click", ui.nextSong);
  backBtn.addEventListener("click", ui.previousSong);

  repeatBtn.addEventListener("click", ui.repeatBtnLogic);

  [allBtn, favouriteBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      status = e.target.dataset.filterstatus;
      ui.filterSongs(status);
    });
  });

  searchBar.addEventListener("input", (e) => {
    let target = e.target.value.trim().toLowerCase();
    ui.searchLogic(target);
  });

  favIconModal.addEventListener("click", (e) => {
    const id = e.target.dataset.idofsong;
    ui.favouriteLogic(id);
    if (e.target.classList.value.includes("--fav-selected")) {
      favIconModal.classList.remove("--fav-selected");
    } else {
      favIconModal.classList.add("--fav-selected");
    }
  });

  ui.progressBar();
});
