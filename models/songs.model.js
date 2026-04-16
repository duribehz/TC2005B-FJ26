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
            'INSERT INTO song (title, artist, link, genre_id) values (?, ?, ?, ?)',
            [this.title, this.artist, this.link, this.genre_id]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM song');
    }

    static findById(id) {
        return db.execute(`
            SELECT song.*, genre.name AS genre_name
            FROM song
            JOIN genre ON song.genre_id = genre.genre_id
            WHERE song.song_id = ?
        `, [id]);
    }

    static update(title, artist, link, genre_id, id) {
        return db.execute(
            `UPDATE song SET title=?, artist=?, link=?, genre_id=? WHERE song_id=?`,
            [title, artist, link, genre_id, id]
        );
    }

    static delete(id) {
        return db.execute(
            `DELETE FROM song WHERE song.song_id = ? `
            , [id]);
    }
}