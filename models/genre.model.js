const db = require('../util/database')

module.exports = class Genre {
    static fetchAll() {
        return db.execute('SELECT * FROM genre')
    }
}