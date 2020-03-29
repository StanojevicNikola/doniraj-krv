const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const config = require('../../test-config');
const utils = require('../../source/utils');

const Controller = require('../../source/controllers/info-controller');

const newsService = app.container.resolve('newsService');
const eventService = app.container.resolve('eventService');
const bloodGroupService = app.container.resolve('bloodGroupService');
const geolocationService = app.container.resolve('geolocationService');
const serviceTime = app.container.resolve('timeService');
const logger = app.container.resolve('logger');

const controller = new Controller(
    {
        logger, newsService, eventService, bloodGroupService, geolocationService,
    },
);

describe('INFO controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();

        // sinonSandbox = sinon.createSandbox();
    });

    it('Should find all news', async () => {
        const inserted = {
            title: 'Title12',
            description: 'Description12',
        };

        try {
            const id = await newsService.create(inserted);
            // const fetched = await newsService.find({});
            // const { title, description } = inserted;

            const fetched = await controller.getNews();
            assert.equal(inserted.title, fetched.title, 'This is all news!');
        } catch (e) {
            assert(false, e);
        }
    });

    // it('should throw error registerUser - exits by username', async () => {
    //     const userData = {
    //         email: 'should_pass',
    //         username: 'should_throw',
    //         password: '123',
    //         name: 'Ime Prezime',
    //     };
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const userController = new UserController(
    //             {
    //                 logger, userService,
    //             },
    //         );

    //         const {
    //             email, username, password, name,
    //         } = userData;

    //         const userId = await userService.create({
    //             email: 'pass', username, password, name,
    //         });

    //         await userController.registerUser(email, password, username, name);
    //     } catch (e) {
    //         assert.deepEqual('Korisnik sa istim korisnickim imenom je vec registrovan!', e.message);
    //     }
    // });

    // it('should pass registerUser', async () => {
    //     const userData = {
    //         email: 'dimitrije.sistem@gmail.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const emailService = app.container.resolve('emailService');
    //         const activationService = app.container.resolve('activationService');

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config, emailService, activationService,
    //             },
    //         );

    //         const {
    //             email, password, username, name,
    //         } = userData;
    //         const result = await userController.registerUser(email, password, username, name);
    //         console.log(result);
    //         assert.deepEqual('Poslat Vam je aktivacioni email', result);
    //     } catch (e) {
    //         assert(false, e);
    //     }
    // }).timeout(10000);

    // it('should throw activateUser - bad activation ID', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     const emailHash = utils.hash(userData.email, config.salt);
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');

    //         await userService.create(userData);

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config, activationService,
    //             },
    //         );

    //         const activationId = await activationService.create({ emailHash });
    //         const badId = 'malformed';
    //         await userController.activateUser(badId);
    //     } catch (e) {
    //         assert.deepEqual('Los ID aktivacije!', e.message);
    //     }
    // });

    // it('should pass activateUser', async () => {
    //     const emailHash = utils.hash('dimitrije@foo.com', config.salt);
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');

    //         const userId = await userService.create(userData);

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config, activationService,
    //             },
    //         );

    //         const activationId = await activationService.create({ emailHash });
    //         const result = await userController.activateUser(emailHash);

    //         const user = await userService.findById(userId);

    //         assert.deepEqual(result, 'Uspesno ste aktivirali Vas nalog');
    //         assert(user.isActive, true);
    //     } catch (e) {
    //         assert(false, e);
    //     }
    // });

    // it('should throw authorize - bad username', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');

    //         const userId = await userService.create(userData);

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config,
    //             },
    //         );

    //         await userController.authorize('bas_username', userData.password);
    //     } catch (e) {
    //         assert.deepEqual(e.message, 'Los username ili password!');
    //     }
    // });

    // it('should throw authorize - bad username/password', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');

    //         const userId = await userService.create(userData);

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config,
    //             },
    //         );

    //         await userController.authorize(userData.username, 'bad_pass');
    //     } catch (e) {
    //         assert.deepEqual(e.message, 'Los username ili password!');
    //     }
    // });

    // it('should throw authorize - user not active', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');

    //         const userId = await userService.create(userData);

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config,
    //             },
    //         );

    //         await userController.authorize(userData.username, userData.password);
    //     } catch (e) {
    //         assert.deepEqual(e.message, 'Niste aktivirali Vas nalog! Molimo proverite email kako bi potvrdili.');
    //     }
    // });

    // it('should pass authorize', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //     };
    //     const emailHash = utils.hash(userData.email, config.salt);
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');
    //         const tokenService = app.container.resolve('tokenService');

    //         const userId = await userService.create(userData);

    //         const userController = new UserController(
    //             {
    //                 logger, userService, config, activationService, tokenService,
    //             },
    //         );

    //         const activationId = await activationService.create({ emailHash });

    //         const activateRes = await userController.activateUser(emailHash);

    //         const authRes = await userController.authorize(userData.username, userData.password);

    //         assert.deepEqual(activateRes, 'Uspesno ste aktivirali Vas nalog');
    //         assert(Object.keys(authRes), ['iat', 'exp', 'token']);
    //     } catch (e) {
    //         assert.deepEqual(e, false);
    //     }
    // });

    // it('should pass addNewRole - RECIPIENT', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //         roles: ['DONOR'],
    //     };

    //     const role = 'RECIPIENT';
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');
    //         const tokenService = app.container.resolve('tokenService');
    //         const donorService = app.container.resolve('donorService');
    //         const recipientService = app.container.resolve('recipientService');
    //         const tokenController = app.container.resolve('tokenController');

    //         const donorId = await donorService.create({ lastDonation: new Date() });
    //         userData.donor = donorId;

    //         const userId = await userService.create(userData);
    //         let user = await userService.findById(userId);

    //         const tokenId = await tokenService.create(user);
    //         const token = await tokenService.findById(tokenId);

    //         const userController = new UserController(
    //             {
    //                 logger,
    //                 userService,
    //                 config,
    //                 activationService,
    //                 tokenService,
    //                 recipientService,
    //                 donorService,
    //                 tokenController,
    //             },
    //         );
    //         const result = await userController
    //             .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
    //         user = await userService.findById(userId);

    //         assert.deepEqual('Uspesno ste dodali ulogu!', result);
    //         assert.deepEqual(user.roles, ['DONOR', 'RECIPIENT']);
    //         assert.notDeepEqual(user[role.toLowerCase()], null);
    //     } catch (e) {
    //         assert(false, e);
    //     }
    // });

    // it('should pass addNewRole - DONOR', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //         roles: ['RECIPIENT'],
    //     };

    //     const role = 'DONOR';
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');
    //         const tokenService = app.container.resolve('tokenService');
    //         const donorService = app.container.resolve('donorService');
    //         const recipientService = app.container.resolve('recipientService');
    //         const tokenController = app.container.resolve('tokenController');

    //         const donorId = await donorService.create({ lastDonation: new Date() });
    //         userData.donor = donorId;

    //         const userId = await userService.create(userData);
    //         let user = await userService.findById(userId);

    //         const tokenId = await tokenService.create(user);
    //         const token = await tokenService.findById(tokenId);

    //         const userController = new UserController(
    //             {
    //                 logger,
    //                 userService,
    //                 config,
    //                 activationService,
    //                 tokenService,
    //                 recipientService,
    //                 donorService,
    //                 tokenController,
    //             },
    //         );
    //         const result = await userController
    //             .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
    //         user = await userService.findById(userId);

    //         assert.deepEqual('Uspesno ste dodali ulogu!', result);
    //         assert.deepEqual(user.roles, ['RECIPIENT', 'DONOR']);
    //         assert.notDeepEqual(user[role.toLowerCase()], null);
    //     } catch (e) {
    //         assert(false, e);
    //     }
    // });

    // it('should fail addNewRole - unknown role', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //         roles: ['RECIPIENT'],
    //     };

    //     const role = 'unknown';
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');
    //         const tokenService = app.container.resolve('tokenService');
    //         const donorService = app.container.resolve('donorService');
    //         const recipientService = app.container.resolve('recipientService');
    //         const tokenController = app.container.resolve('tokenController');

    //         const donorId = await donorService.create({ lastDonation: new Date() });
    //         userData.donor = donorId;

    //         const userId = await userService.create(userData);
    //         const user = await userService.findById(userId);

    //         const tokenId = await tokenService.create(user);
    //         const token = await tokenService.findById(tokenId);

    //         const userController = new UserController(
    //             {
    //                 logger,
    //                 userService,
    //                 config,
    //                 activationService,
    //                 tokenService,
    //                 recipientService,
    //                 donorService,
    //                 tokenController,
    //             },
    //         );
    //         const result = await userController
    //             .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
    //     } catch (e) {
    //         assert('Losa vrednost parametra!', e.message);
    //     }
    // });

    // it('should should pass - adding existing role', async () => {
    //     const userData = {
    //         email: 'dimitrije@foo.com',
    //         password: '1234',
    //         username: 'user1',
    //         name: 'Ime Prezime',
    //         roles: ['RECIPIENT'],
    //     };

    //     const role = 'RECIPIENT';
    //     try {
    //         const userService = app.container.resolve('userService');
    //         const logger = app.container.resolve('logger');
    //         const activationService = app.container.resolve('activationService');
    //         const tokenService = app.container.resolve('tokenService');
    //         const donorService = app.container.resolve('donorService');
    //         const recipientService = app.container.resolve('recipientService');
    //         const tokenController = app.container.resolve('tokenController');

    //         const donorId = await donorService.create({ lastDonation: new Date() });
    //         userData.donor = donorId;

    //         const userId = await userService.create(userData);
    //         const user = await userService.findById(userId);

    //         const tokenId = await tokenService.create(user);
    //         const token = await tokenService.findById(tokenId);

    //         const userController = new UserController(
    //             {
    //                 logger,
    //                 userService,
    //                 config,
    //                 activationService,
    //                 tokenService,
    //                 recipientService,
    //                 donorService,
    //                 tokenController,
    //             },
    //         );
    //         const result = await userController
    //             .addNewRole({ role, roleData: {}, rawToken: token.rawToken });
    //         assert.deepEqual('Vec imate zahtevanu ulogu.', result);
    //     } catch (e) {
    //         assert(false, e);
    //     }
    // });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});
