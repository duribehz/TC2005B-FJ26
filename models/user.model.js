const db = require('../util/database');
const bcrypt = require('bcryptjs');


class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    static create(name, password) {
        return bcrypt.hash(password, 12)
            .then((hashedPassword) => {
                return db.execute(
                    `INSERT INTO users (name, password) VALUES (?, ?)`,
                    [name, hashedPassword]
                );
            });
    }

static findByName(username) {
  return db.query('SELECT user_id, name, password, role FROM users WHERE name = ?', [username]);
}
}

module.exports = User;