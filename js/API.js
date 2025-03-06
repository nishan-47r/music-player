const data = [

  {
      id: 1,
      title: "bubble bee",
      singer: "Tate McRae",
      isFavourite: 0,
    audioSrc: "./assets/audios/1.mpeg",
    coverSrc: "./assets/images/music/bubble bee.jpg",
    coverModal: "./assets/images/music/.jpg",
  },
  {
      id: 2,
      title: "die with a smile",
      singer: "LADY GAGA & BRUNO MARS",
      isFavourite: 0,
    audioSrc: "./assets/audios/2.mp3",
    coverSrc: "./assets/images/music/die with a smile.jpg",
    coverModal: "./assets/images/music/greedyModal.jpg",
  },
  {
      id: 3,
      title: "fifty fifty-cupid",
      singer: "Tate McRae",
      isFavourite: 0,
    audioSrc: "./assets/audios/3.mpeg",
    coverSrc: "./assets/images/music/cupid.jpg",
    coverModal: "./assets/images/music/greedyModal.jpg",
  },
  {
      id: 4,
      title: "Eenie meenie",
      singer: "SEANKINGSTONE & JUSTINBIEBER",
      isFavourite: 0,
    audioSrc: "./assets/audios/4.mp3",
    coverSrc: "./assets/images/music/mine.jpg",
   
  },
  {
      id: 5,
      title: "sapientdreams",
      singer: "Tate McRae",
      isFavourite: 0,
    audioSrc: "./assets/audios/5.mp4",
    coverSrc: "./assets/images/music/pastlive.jpg",
  },
  {
      id: 6,
      title: "Gangnam Style",
      singer: "psy",
      isFavourite: 0,
    audioSrc: "./assets/audios/6.mpeg",
    coverSrc: "./assets/images/music/psy.jpg",
  },
  {
      id: 7,
      title: "bella ciao",
      singer: "not entry",
      isFavourite: 0,
    audioSrc: "./assets/audios/7.mp4",
    coverSrc: "./assets/images/music/money heist.jpg",
  
  },
  {
      id: 8,
      title: "unstoppable ",
      singer: "SIA",
      isFavourite: 0,
    audioSrc: "./assets/audios/8.mpeg",
    coverSrc: "./assets/images/music/sia.jpg",
    
  },
  {
      id: 9,
      title: "blue",
      singer: "YUNG YOO",
      isFavourite: 0,
    audioSrc: "./assets/audios/9.mp3",
    coverSrc: "./assets/images/music/blue.jpg",

  },
  {
      id: 10,
      title: "Reawaking",
      singer: "LISA",
      isFavourite: 0,
    audioSrc: "./assets/audios/10.mpeg",
    coverSrc: "./assets/images/music/lisa.jpg",
    
  },
  {
      id: 11,
      title: "bones",
      singer: "IMAGINE DRAGONS",
      isFavourite: 0,
    audioSrc: "./assets/audios/11.mp3",
    coverSrc: "./assets/images/music/bones.jpg",
    
  },
  {
      id: 12,
      title: "Enemy",
      singer: "IMAGINE DRAGONS",
      isFavourite: 0,
    audioSrc: "./assets/audios/12.mp3",
    coverSrc: "./assets/images/music/enemy.jpg",
    
  },
  {
      id: 13,
      title: "Believer",
      singer: "IMAGINE DRAGONS",
      isFavourite: 0,
    audioSrc: "./assets/audios/13.mp3",
    coverSrc: "./assets/images/music/believer.jpg",
    
  },

  {
      id: 14,
      title: "Safari",
      singer: "SARENA",
      isFavourite: 0,
    audioSrc: "./assets/audios/14.mp3",
    coverSrc: "./assets/images/music/safari.jpg",
    
  },
];

class Storage {
  static getData() {
    return data;
  }

  static saveDate(data) {
    localStorage.setItem("songs", JSON.stringify(data));
  }
}

export default Storage;
