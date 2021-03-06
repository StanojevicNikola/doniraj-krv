const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const config = require('../../test-config');
const UserController = require('../../source/controllers/user-controller');
const utils = require('../../source/utils');

describe('User controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('should throw error registerUser - exists by email', async () => {
        const userData = {
            email: 'should_throw',
            username: 'asd',
            password: '123',
            name: 'Ime Prezime',
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const userController = new UserController(
                {
                    logger, userService,
                },
            );

            const userId = await userService.create(userData);

            const {
                email, username, password, name,
            } = userData;
            await userController.registerUser(email, password, username, name);
        } catch (e) {
            assert.deepEqual('Korisnik sa istom email adresom je vec registrovan!', e.message);
        }
    });

    it('should throw error registerUser - exits by username', async () => {
        const userData = {
            email: 'asd',
            username: 'should_throw',
            password: '123',
            name: 'Ime Prezime',
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const userController = new UserController(
                {
                    logger, userService,
                },
            );

            const {
                email, username, password, name,
            } = userData;

            const userId = await userService.create({
                email: 'pass', username, password, name,
            });

            await userController.registerUser(email, password, 'should_throw', name);
        } catch (e) {
            assert.deepEqual('Korisnik sa istim korisnickim imenom je vec registrovan!', e.message);
        }
    });

    it('should pass registerUser', async () => {
        const userData = {
            email: 'dimitrije.sistem@fooo.com',
            password: '1234',
            username: 'prolazi',
            name: 'Ime Prezime',
            emailHash: utils.hash('dimitrije.sistem@fooo.com', config.salt),
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const emailService = app.container.resolve('emailService');
            const activationService = app.container.resolve('activationService');

            const userController = new UserController(
                {
                    logger, userService, config, emailService, activationService,
                },
            );

            const {
                email, password, username, name,
            } = userData;
            const { data, message } = await userController
                .registerUser(email, password, username, name);
            const hash = data.replace(config.activationRoute, '');

            assert.deepEqual('Poslat Vam je aktivacioni email', message);
            assert.deepEqual(userData.emailHash, hash);
        } catch (e) {
            assert(false, e);
        }
    }).timeout(10000);

    it('should throw activateUser - bad activation ID', async () => {
        const userData = {
            email: 'dimitrije@foo.com',
            password: '1234',
            username: 'user1',
            name: 'Ime Prezime',
        };
        const emailHash = utils.hash(userData.email, config.salt);
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');

            await userService.create(userData);

            const userController = new UserController(
                {
                    logger, userService, config, activationService,
                },
            );

            const activationId = await activationService.create({ emailHash });
            const badId = 'malformed';
            await userController.activateUser(badId);
        } catch (e) {
            assert.deepEqual('Los ID aktivacije!', e.message);
        }
    });

    it('should pass activateUser', async () => {
        const userData = {
            email: 'unique@foo.com',
            password: '1234',
            username: 'user_unique',
            name: 'Ime Prezime',
            emailHash: utils.hash('unique@foo.com', config.salt),
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');

            const userId = await userService.create(userData);

            const userController = new UserController(
                {
                    logger, userService, config, activationService,
                },
            );

            const activationId = await activationService.create({ emailHash: userData.emailHash });
            const result = await userController.activateUser(userData.emailHash);

            const user = await userService.findById(userId);

            assert.deepEqual(result, 'Uspesno ste aktivirali Vas nalog');
            assert(user.isActive, true);
        } catch (e) {
            assert(false, e);
        }
    });

    it('should throw authorize - bad username', async () => {
        const userData = {
            email: 'dimi@foo.com',
            password: '1234',
            username: 'user_dimi',
            name: 'Ime Prezime',
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');

            const userId = await userService.create(userData);

            const userController = new UserController(
                {
                    logger, userService, config,
                },
            );

            await userController.authorize('bas_username', userData.password);
        } catch (e) {
            assert.deepEqual(e.message, 'Los username ili password!');
        }
    });

    it('should throw authorize - bad username/password', async () => {
        const userData = {
            email: 'misa@foo.com',
            password: '1234',
            username: 'user_misa',
            name: 'Ime Prezime',
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');

            const userId = await userService.create(userData);

            const userController = new UserController(
                {
                    logger, userService, config,
                },
            );

            await userController.authorize(userData.username, 'bad_pass');
        } catch (e) {
            assert.deepEqual(e.message, 'Los username ili password!');
        }
    });

    it('should throw authorize - user not active', async () => {
        const userData = {
            email: 'asd@foo.com',
            password: '1234',
            username: 'user_asd',
            name: 'Ime Prezime',
        };
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');

            const userId = await userService.create(userData);

            const userController = new UserController(
                {
                    logger, userService, config,
                },
            );

            await userController.authorize(userData.username, userData.password);
        } catch (e) {
            assert.deepEqual(e.message, 'Niste aktivirali Vas nalog! Molimo proverite email kako bi potvrdili.');
        }
    });

    it('should pass authorize', async () => {
        const userData = {
            email: 'qwerty@foo.com',
            password: '1234',
            username: 'user_qwerty',
            name: 'Ime Prezime',
        };
        const emailHash = utils.hash(userData.email, config.salt);
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');
            const tokenService = app.container.resolve('tokenService');

            const userId = await userService.create(userData);

            const userController = new UserController(
                {
                    logger, userService, config, activationService, tokenService,
                },
            );

            const activationId = await activationService.create({ emailHash });

            const activateRes = await userController.activateUser(emailHash);

            const authRes = await userController.authorize(userData.username, userData.password);

            assert.deepEqual(activateRes, 'Uspesno ste aktivirali Vas nalog');
            assert(Object.keys(authRes), ['iat', 'exp', 'token']);
        } catch (e) {
            assert.deepEqual(e, false);
        }
    });

    it('should pass addNewRole - RECIPIENT', async () => {
        const userData = {
            email: 'recipient@foo.com',
            password: '1234',
            username: 'user_recipient',
            name: 'Ime Prezime',
            roles: ['DONOR'],
        };

        const role = 'RECIPIENT';
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');
            const tokenService = app.container.resolve('tokenService');
            const donorService = app.container.resolve('donorService');
            const recipientService = app.container.resolve('recipientService');
            const tokenController = app.container.resolve('tokenController');

            const donorId = await donorService.create({ lastDonation: new Date() });
            userData.donor = donorId;

            const userId = await userService.create(userData);
            let user = await userService.findById(userId);

            const tokenId = await tokenService.create(user);
            const token = await tokenService.findById(tokenId);

            const userController = new UserController(
                {
                    logger,
                    userService,
                    config,
                    activationService,
                    tokenService,
                    recipientService,
                    donorService,
                    tokenController,
                },
            );
            const { message, data } = await userController
                .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
            user = await userService.findById(userId);

            assert.deepEqual('Uspesno ste dodali novu ulogu!', message);
            assert.deepEqual(user.roles, ['DONOR', 'RECIPIENT']);
            assert.notDeepEqual(user[role.toLowerCase()], null);
            assert.deepEqual(Object.keys(data), ['iat', 'exp', 'token']);
        } catch (e) {
            assert(false, e);
        }
    });

    it('should pass addNewRole - DONOR', async () => {
        const userData = {
            email: 'donor@foo.com',
            password: '1234',
            username: 'user_donor',
            name: 'Ime Prezime',
            roles: ['RECIPIENT'],
        };

        const role = 'DONOR';
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');
            const tokenService = app.container.resolve('tokenService');
            const donorService = app.container.resolve('donorService');
            const recipientService = app.container.resolve('recipientService');
            const tokenController = app.container.resolve('tokenController');

            const donorId = await donorService.create({ lastDonation: new Date() });
            userData.donor = donorId;

            const userId = await userService.create(userData);
            let user = await userService.findById(userId);

            const tokenId = await tokenService.create(user);
            const token = await tokenService.findById(tokenId);

            const userController = new UserController(
                {
                    logger,
                    userService,
                    config,
                    activationService,
                    tokenService,
                    recipientService,
                    donorService,
                    tokenController,
                },
            );
            const { message, data } = await userController
                .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
            user = await userService.findById(userId);

            assert.deepEqual('Uspesno ste dodali novu ulogu!', message);
            assert.deepEqual(user.roles, ['RECIPIENT', 'DONOR']);
            assert.notDeepEqual(user[role.toLowerCase()], null);
            assert.deepEqual(Object.keys(data), ['iat', 'exp', 'token']);
        } catch (e) {
            assert(false, e);
        }
    });

    it('should fail addNewRole - unknown role', async () => {
        const userData = {
            email: 'unknown@foo.com',
            password: '1234',
            username: 'user_unknown',
            name: 'Ime Prezime',
            roles: ['RECIPIENT'],
        };

        const role = 'unknown';
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');
            const tokenService = app.container.resolve('tokenService');
            const donorService = app.container.resolve('donorService');
            const recipientService = app.container.resolve('recipientService');
            const tokenController = app.container.resolve('tokenController');

            const donorId = await donorService.create({ lastDonation: new Date() });
            userData.donor = donorId;

            const userId = await userService.create(userData);
            const user = await userService.findById(userId);

            const tokenId = await tokenService.create(user);
            const token = await tokenService.findById(tokenId);

            const userController = new UserController(
                {
                    logger,
                    userService,
                    config,
                    activationService,
                    tokenService,
                    recipientService,
                    donorService,
                    tokenController,
                },
            );
            const result = await userController
                .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
        } catch (e) {
            assert('Losa vrednost parametra!', e.message);
        }
    });

    it('should pass - adding existing role', async () => {
        const userData = {
            email: 'existing@foo.com',
            password: '1234',
            username: 'user_existing',
            name: 'Ime Prezime',
            roles: ['DONOR'],
        };

        const role = 'DONOR';
        try {
            const userService = app.container.resolve('userService');
            const logger = app.container.resolve('logger');
            const activationService = app.container.resolve('activationService');
            const tokenService = app.container.resolve('tokenService');
            const donorService = app.container.resolve('donorService');
            const recipientService = app.container.resolve('recipientService');
            const tokenController = app.container.resolve('tokenController');

            const donorId = await donorService.create({ lastDonation: new Date() });
            userData.donor = donorId;

            const userId = await userService.create(userData);
            const user = await userService.findById(userId);

            const tokenId = await tokenService.create(user);
            const token = await tokenService.findById(tokenId);

            const userController = new UserController(
                {
                    logger,
                    userService,
                    config,
                    activationService,
                    tokenService,
                    recipientService,
                    donorService,
                    tokenController,
                },
            );
            const { data, message } = await userController
                .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
            assert.deepEqual('Vec imate zahtevanu ulogu.', message);
            assert.deepEqual(data, null);
        } catch (e) {
            assert(false, e);
        }
    });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});
