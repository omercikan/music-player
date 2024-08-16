//!MUSIC CLASS AREA
class Music {
    constructor(img, audio, title, singer) {
        this.img = img;
        this.audio = audio;
        this.title = title;
        this.singer = singer;
    };

    getName() {
        return `${this.title} - ${this.singer}`;
    };
};

//!MUSIC LIST (ARRAY)
const musicList = [
    new Music("1.jpg", "1.mp3", "Kalbim Çukurda", "Gazapizm & Cem Adrian"),
    new Music("2.jpg", "2.mp3", "Boşver", "Nilüfer"),
    new Music("3.jpg", "3.mp3", "Bu da Geçer mi Sevgilim", "Yalın"),
    new Music("4.webp", "4.mp3", "Dobro Vecer", "Farazi V Kayra"),
    new Music("5.jpg", "5.mp3", "Hadi Sen Git İşine", "Ahmet Kaya & Gazapizm"),
    new Music("6.jpg", "6.mp3", "Rewend", "Gazapizm & Aynur Doğan"),
];