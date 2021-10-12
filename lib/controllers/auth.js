const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
//const Auth = require('../models/Auth.js');
const authService = require('../services/authService.js');

module.exports = Router()
    .post('/signup', async (req, res, next) => {
        try {
            const newUser = await authService.create({ ...req.body, roleTitle: 'USER' });
            res.send(newUser);
        } catch (error) {
            error.status = 400;
            next(error);
        }
    })

    .post('/login', async (req, res, next) => {
        try {
            const loginUser = await authService.credential(req.body);
            res.cookie('connected', loginUser.authToken(), {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 12,
            });
            res.json(loginUser.id);
        } catch(error) {
            error.status = 401;
            next(error);
        }
    })

    .get('/me', ensureAuth, async (req, res, next) => {
        try {
            //const id = req.userId;
            //const user = await Auth.getUser(id);
            res.send(req.user);
        } catch(error) {
            next(error);
        }
    })
;
