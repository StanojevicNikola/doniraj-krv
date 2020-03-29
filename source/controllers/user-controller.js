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
            throw Error('Korisnik sa istom email adresom je vec registrovan!');
        }

        existingUser = await this.userService.findOne({ username });
        if (existingUser != null) {
            throw Error('Korisnik sa istim korisnickim imenom je vec registrovan!');
        }
        const userId = await this.userService.create({
            email, password, username, name,
        });
        const user = await this.userService.findById(userId);

        await this.activationService.create({ emailHash: user.emailHash });
        const link = this.config.activationRoute + user.emailHash;
        await this.emailService.sendEmail('activation', { name, link }, { recipientEmail: email, subject: 'Activation link' });
        return 'Poslat Vam je aktivacioni email';
    }

    async activateUser(emailHash) {
        const activation = await this.activationService.findOne({ emailHash });
        if (activation == null) {
            throw Error('Los ID aktivacije!');
        }
        // TODO check if expired and throw error or new activation
        await this.userService.activateNewUser(emailHash);
        return 'Uspesno ste aktivirali Vas nalog';
    }

    async authorize(username, password) {
        const user = await this._findByUserPass(username, password);
        if (user == null) {
            throw Error('Los username ili password!');
        }
        if (user.isActive === false) {
            throw Error('Niste aktivirali Vas nalog! Molimo proverite email kako bi potvrdili.');
        }
        const tokenId = await this.tokenService.create(user);
        const token = await this.tokenService.findById(tokenId);
        return {
            iat: token.iat,
            exp: token.exp,
            token: token.rawToken,
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
            throw Error('Losa vrednost parametra!');
        }

        user = await this.userService.findById(tokenData.userId);
        const tokenId = await this.tokenService.create(user);
        const token = await this.tokenService.findById(tokenId);
        return {
            message: 'Uspesno ste dodali novu ulogu!',
            data: {
                iat: token.iat,
                exp: token.exp,
                token: token.rawToken,
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
