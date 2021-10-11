const pool = require('../utils/pool');

module.exports = class Role {
    id;
    title;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
    }

    static async findById(id) {

        return new Role(rows[0]);
    }

    static async findByTitle(title) {

        return new Role(rows[0]);
    }
}