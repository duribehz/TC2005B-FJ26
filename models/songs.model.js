const db = require('../util/database')

module.exports = class Song {
    constructor(title, artist, link, genre_id){
        this.title = title;
        this.artist = artist;
        this.link = link;
        this.genre_id = genre_id;
    }

    save() {
        return db.execute(
            'INSERT INTO songs (title, artist, link, genre_id) values (?, ?, ?, ?)',
            [this.title, this.artist, this.link, this.genre_id]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM songs');
    }

    static findById(id) {
        return db.execute(`
            SELECT songs.*, genres.name AS genre_name
            FROM songs
            JOIN genres ON songs.genre_id = genres.genre_id
            WHERE songs.song_id = ?
        `, [id]);
    }
}