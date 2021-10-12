const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const Role = require('./Role');

module.exports = class Auth {
    id;
    email;
    passwordHash;
    role;

    constructor(row) {
        this.id = row.id;
        this.email = row.email;
        this.passwordHash = row.password_hash;
        this.role = row.role;
    }

    static async create({ email, passwordHash, roleTitle }) {
        const allow = await Role.findByTitle(roleTitle);
        const { rows } = await pool.query(
            'INSERT INTO users (email, password_hash, role_id) VALUES ($1, $2, $3) RETURNING *',
            [email, passwordHash, allow.id]
        );
        return new Auth({...rows[0], role: allow.title});
        }

    static async getByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
        email,
    ]);
        if (!rows[0]) return null;

        const role = await Role.findById(rows[0].role_id);

        return new Auth({...rows[0], role: role.title});
    }

    static async getUser(id){
        const { rows } = await pool.query(
            'SELECT id FROM users WHERE id = ($1)', [id]
        );

        const role = await Role.findById(rows[0].role_id);

        return new Auth({...rows[0], role: role.title})
    }

    toJSON() {
        return { 
            id: this.id, email: this.email, 
            role: this.role
        };
    }
    
    authToken() {
        return jwt.sign(this.toJSON(), process.env.AUTH_SECRET, {expiresIn: '24h'});
    }
};