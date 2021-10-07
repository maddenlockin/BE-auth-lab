const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');

module.exports = class authService {
    static async create({ email, password }) {
        const existingUser = await Auth.getByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );

        const user = await Auth.create({
            email,
            passwordHash,
        });

        return user;
    }
};
