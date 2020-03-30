const {
    describe, it, before, after,
} = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { expect } = chai;

const app = require('../test-app');

const config = app.container.resolve('config');
const logger = app.container.resolve('logger');
const utils = require('../../source/utils');

const Client = {};

describe('Integration test', () => {
    before(async () => {
        await app.start();
    });

    it('Should login a user', async (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .post('/users/login')
            .send(
                {
                    username: 'adminko',
                    password: 'admin',
                },
            )
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);
                Object.assign(Client, {
                    tokenId: body.data.token,
                });
                expect(body).to.be.not.null;
                expect(body.data).to.be.not.null;
                expect(body.data.exp).to.be.not.null;
                expect(body.data.iat).to.be.not.null;
                expect(body.data.token).to.be.not.null;
            });
        done();
    });
    after(async () => {
        await app.stop();
    });
});
