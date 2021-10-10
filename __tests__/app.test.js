const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('auth lab routes', () => {
    beforeEach(() => {
        return setup(pool);
    });


    it('verifies POST route to sign up user', async () => {
        return request(app)
            .post('/api/v1/auth/signup')
            .send({ email: 'dani@duck.com', password: 'p4ssw0rd' })
            .then((res) => {
                expect(res.body).toEqual({
                    id: '1',
                    email: 'dani@duck.com',
                });
            });
    });

    it('verifies 400 message when email already exists', async () => {
        await request(app)
            .post('/api/v1/auth/signup')
            .send({ email: 'dani@duck.com', password: 'passin' });
        return request(app)
            .post('/api/v1/auth/signup')
            .send({ email: 'dani@duck.com', password: 'failin' })
            .then((res) => expect(res.status).toEqual(400));
    });

    it('logs in a user and returns the user id', async () => {
        await request(app)
            .post('/api/v1/auth/signup')
            .send({ email: 'dani@duck.com', password: 'p4ssw0rd' });

        return request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'dani@duck.com', password: 'p4ssw0rd' })
            .then((res) => {
                console.log('0000', res.body);
                expect(res.body).toEqual('1');
            }
            );
    });

    it('verifies 401 message credentials do not pass', async () => {
        await request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'dani@duck.com', password: 'passin' });
        return request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'dani@duck.com', password: 'failin' })
            .then((res) => expect(res.status).toEqual(401));
    });

    it('verifies get route that responds with currently logged in user', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/auth/signup')
            .send({ email: 'dani@duck.com', password: 'p4ssw0rd' });
        await agent.post('/api/v1/auth/login')
            .send({ email: 'dani@duck.com', password: 'p4ssw0rd' });
        const res = await agent
            .get('/api/v1/auth/me');
        expect(res.body).toEqual({ id: '1' });
    });

    afterAll(() => {
        pool.end();
    });
});
