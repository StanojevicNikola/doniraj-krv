const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const config = require('../../test-config');
const UserController = require('../../source/controllers/user-controller');

describe('User controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('should throw error registerUser - exits by email', async () => {
        const userData = {
            email: 'should_throw',
            username: 'should_pass',
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
            email: 'should_pass',
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


            await userController.registerUser(email, password, username, name);
        } catch (e) {
            assert.deepEqual('Korisnik sa istim korisnickim imenom je vec registrovan!', e.message);
        }
    });

    it('should test registerUser', async () => {
        const userData = {
            email: 'dimitrije.misa@gmail.com',
            password: '1234',
            username: 'user1',
            name: 'Ime Prezime',
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
            const result = await userController.registerUser(email, password, username, name);
            console.log(result);
            assert.deepEqual('Poslat Vam je aktivacioni email', result);
        } catch (e) {
            assert(false, e);
        }
    }).timeout(10000);

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});
