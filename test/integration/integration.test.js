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

    it('Should register a user', (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .post('/users/register')
            .send({
                email: 'mock-mail@foo.com',
                username: 'user',
                password: 'pass',
                name: 'John Doe',
            })
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);

                expect(body).to.be.not.equal(null);
                expect(body.data).to.be.not.equal(null);

                const hash = body.data.replace(config.activationRoute, '');
                Object.assign(Client, {
                    email: 'mock-mail@foo.com',
                    username: 'user',
                    password: 'pass',
                    name: 'John Doe',
                    activationId: hash,
                });

                expect(body.message).to.be.deep.equal('Poslat Vam je aktivacioni email');

                expect(hash).to.be.equal(utils.hash(Client.email, config.salt));
                done();
            });
    }).timeout(5000);

    it('Should activate a user', (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .get(`/users/activate/${Client.activationId}`)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);

                expect(body).to.be.not.equal(null);
                expect(body.data).to.be.deep.equal({});
                expect(body.message).to.be.equal('Uspesno ste aktivirali Vas nalog');
                done();
            });
    });

    it('Should login a user', (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .post('/users/login')
            .send({
                username: Client.username,
                password: Client.password,
            })
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);
                Object.assign(Client, {
                    tokenId: body.data.token,
                });
                expect(body).to.be.not.equal(null);
                expect(body.data).to.be.not.equal(null);
                expect(body.data.exp).to.be.not.equal(null);
                expect(body.data.iat).to.be.not.equal(null);
                expect(body.data.token).to.be.not.equal(null);
                done();
            });
    });

    it('Should add RECIPIENT role', (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .post('/user/addRole')
            .set('Authorization', `Bearer ${Client.tokenId}`)
            .send({
                role: 'RECIPIENT',
                roleData: {},
            })
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);

                Object.assign(Client, {
                    tokenId: body.data.token,
                });
                expect(body).to.be.not.equal(null);
                expect(body.data).to.be.not.equal(null);
                expect(body.data.exp).to.be.not.equal(null);
                expect(body.data.iat).to.be.not.equal(null);
                expect(body.data.token).to.be.not.equal(null);
                done();
            });
    });

    it('Should return - Vec imate zahtevanu ulogu. add RECIPIENT role', (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .post('/user/addRole')
            .set('Authorization', `Bearer ${Client.tokenId}`)
            .send({
                role: 'RECIPIENT',
                roleData: {},
            })
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);

                expect(body).to.be.not.equal(null);
                expect(body.data).to.be.equal(null);
                expect(body.message).to.be.deep.equal('Vec imate zahtevanu ulogu.');
                done();
            });
    });

    it('Should successfully requestBlood', (done) => {
        chai.request(`http://localhost:${config.APIserver.port}`)
            .post('/recipient/requestBlood')
            .set('Authorization', `Bearer ${Client.tokenId}`)
            .send({
                city: 'Beograd',
                places: [],
                radius: 50000,
                queryType: 'ALL',
                groups: ['A+'],
            })
            .end((err, res) => {
                res.should.have.status(200);
                const body = utils.clone(res.body);

                expect(body).to.be.not.equal(null);
                // TODO fix this when database is seeded
                expect(body.data).to.be.deep.equal([]);
                expect(body.message).to.be.deep.equal('Kompatibilni donori su obavesteni o Vasem zahtevu!');
                done();
            });
    });

    after(async () => {
        await app.stop();
    });
});
