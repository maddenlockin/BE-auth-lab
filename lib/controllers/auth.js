const { Router } = require('express');
const authService = require('../services/authService.js');

module.exports = Router()
    .post('/signup', async (req, res, next) => {
        try {
            const user = await authService.create(req.body);

            res.send(user);
        } catch (error) {
            next(error);
        }
    })
;
