const mongoose = require('mongoose');
const utils = require('../utils');

class UserController {
    constructor({
        logger, config, userService, donorService, recipientService,
        tokenService, activationService, emailService, tokenController,
    }) {
        this.logger = logger;
        this.config = config;
        this.userService = userService;
        this.donorService = donorService;
        this.recipientService = recipientService;
        this.tokenService = tokenService;
        this.activationService = activationService;
        this.emailService = emailService;
        this.tokenController = tokenController;
    }

    async registerUser(email, password, username, name) {
        let existingUser = await this.userService.findOne({ email });
        if (existingUser != null) {
            throw Error('Korisnik sa istom email adresom je već registrovan!');
        }

        existingUser = await this.userService.findOne({ username });
        if (existingUser != null) {
            throw Error('Korisnik sa istim korisničkim imenom je već registrovan!');
        }
        const userId = await this.userService.create({
            email, password, username, name,
        });
        const user = await this.userService.findById(userId);

        await this.activationService.create({ emailHash: user.emailHash });
        const link = this.config.activationRoute + user.emailHash;
        await this.emailService.sendEmail('activation', { name, link }, { recipientEmail: email, subject: 'Aktivacioni email' });
        return { data: link, message: 'Poslat Vam je aktivacioni email' };
    }

    async activateUser(emailHash) {
        const activation = await this.activationService.findOne({ emailHash });
        if (activation == null) {
            throw Error('Loš aktivacioni link!');
        }
        // TODO check if expired and throw error or new activation
        await this.userService.activateNewUser(emailHash);
        return 'Uspešno ste aktivirali Vaš nalog';
    }

    async authorize(username, password) {
        const user = await this._findByUserPass(username, password);
        if (user == null) {
            throw Error('Loše korisničko ime ili password!');
        }
        if (user.isActive === false) {
            throw Error('Niste aktivirali Vaš nalog! Molimo proverite email kako bi Vaš nalog bio aktiviran.');
        }
        const tokenId = await this.tokenService.create(user);
        const token = await this.tokenService.findById(tokenId);
        return {
            iat: token.iat,
            exp: token.exp,
            token: token.rawToken,
        };
    }

    async updateUserData(data, token) {
        const tokenData = utils.decodeToken(token);
        await this.userService.updateOne(tokenData.userId, data);

        return {
            message: 'Uspešno ste ažurirali podatke!',
            data: {},
        };
    }

    async updateDonation(data) {
        const { lastDonation, token } = data;
        const tokenData = utils.decodeToken(token);
        const donorId = await this.userService.getDonorId(tokenData.userId);
        await this.donorService.updateOne(donorId, { lastDonation });

        return {
            message: 'Uspešno ste ažurirali datum donacije!',
            data: {},
        };
    }

    async addNewRole(data) {
        const {
            role, roleData, rawToken,
        } = data;

        const tokenData = utils.decodeToken(rawToken);

        if (tokenData[role.toLowerCase()] != null) { return { message: 'Vec imate zahtevanu ulogu.', data: null }; }

        let user = await this.userService.findById(tokenData.userId);
        user.roles.push(role);
        let id;
        if (role === 'DONOR') {
            id = await this._createDonor({ ...roleData, user: tokenData.userId });
            await this.userService.updateOne(tokenData.userId, { donor: id, roles: user.roles });
        } else if (role === 'RECIPIENT') {
            id = await this._createRecipient({ ...roleData, user: tokenData.userId });
            await this.userService
                .updateOne(tokenData.userId, { recipient: id, roles: user.roles });
        } else {
            throw Error('Loša vrednost parametra!');
        }

        user = await this.userService.findById(tokenData.userId);
        const tokenId = await this.tokenService.create(user);
        const token = await this.tokenService.findById(tokenId);
        return {
            message: 'Uspešno ste dodali novu ulogu!',
            data: {
                iat: token.iat,
                exp: token.exp,
                token: token.rawToken,
            },
        };
    }

    async getUser(data) {
        const { rawToken } = data;

        const tokenData = utils.decodeToken(rawToken);
        const user = await this.userService.findById(tokenData.userId);
        const donorData = user.donor ? (await this.donorService.findById(user.donor, ['blood', 'geolocation'])) : false;
        const recipientData = user.recipient
            ? (await this.recipientService.findById(user.recipient, ['blood'])) : false;
        return {
            message: 'Uspešno ste dohvatili usera!',
            data: {
                email: user.email,
                isAdmin: user.isAdmin,
                name: user.name,
                roles: user.roles,
                username: user.username,
                donor: donorData,
                coordinator: recipientData,
            },
        };
    }

    async _createDonor(user) {
        return this.donorService.create(user);
    }

    async _createRecipient(user) {
        return this.recipientService.create(user);
    }

    async _findByUserPass(username, password) {
        return this.userService.findByUserPass(username, password);
    }
}

module.exports = UserController;
