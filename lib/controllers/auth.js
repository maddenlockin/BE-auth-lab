const { Router } = require('express');
const authService = require('../services/authService.js');

module.exports = Router()
    .post('/signup', async (req, res, next) => {
        try {
            const user = await authService.create(req.body);
            res.send(user.toJSON());
        } catch (error) {
            error.status = 400;
            next(error);
        }
    })

    .post('/login', async (req, res, next) => {
        try {
            const loginUser = await authService.credential(req.body);
            res.cookie('userId', loginUser.id, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 12,
            });
            console.log(loginUser.id);
            res.json(loginUser.id);
        } catch(error) {
            next(error);
        }
    })
;
