const pool = require('../utils/pool');

module.exports = class Auth {
    id;
    email;
    passwordHash;

    constructor(row) {
        this.id = row.id;
        this.email = row.email;
        this.passwordHash = row.password_hash;
    }

    static async create({ email, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
        [email, passwordHash]
    );

    return new Auth(rows[0]);
    }

    toJSON() {
        return { id: this.id, email: this.email };
    }

    static async getByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
        email,
    ]);

    if (!rows[0]) return null;

    return new User(rows[0]);
    }
};