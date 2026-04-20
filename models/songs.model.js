const db = require('../util/database')

module.exports = class Song {
  constructor(title, artist, link, genre_id, image) {
    this.title = title;
    this.artist = artist;
    this.link = link;
    this.genre_id = genre_id;
    this.image = image;
  }

  save() {
    return db.execute('CALL sp_insert_song(?, ?, ?, ?, ?)',
      [this.title, this.artist, this.link, this.genre_id, this.image]
    );
  }

  static fetchAll() {
    return db.execute('CALL sp_get_all_songs()');
  }

  static findById(id) {
    return db.execute('CALL sp_get_song_by_id(?)', [id]);
  }

  static update(title, artist, link, genre_id, id, image) {
    return db.execute('CALL sp_update_song(?, ?, ?, ?, ?, ?)',
      [title, artist, link, genre_id, id, image]
    );
  }

  static delete(id) {
    return db.execute('CALL sp_delete_song(?)', [id]);
  }
}