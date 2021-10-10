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

    static async credential({ email, password }){
        const logIn = await Auth.getByEmail(email);
        if (!logIn){
            throw new Error('email/password incorrect');
        }
        const credPass = await bcrypt.compare(password, logIn.passwordHash);
        
        if (!credPass){
            throw new Error('email/password incorrect');
        }
        return logIn;
    }
};
