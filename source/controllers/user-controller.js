class UserController {
    constructor({
        // eslint-disable-next-line max-len
        logger, config, userService, donorService, recipientService, tokenService, activationService, emailService,
    }) {
        this.logger = logger;
        this.config = config;
        this.userService = userService;
        this.donorService = donorService;
        this.recipientService = recipientService;
        this.tokenService = tokenService;
        this.activationService = activationService;
        this.emailService = emailService;
    }

    async registerUser(email, password, name) {
        const existingUser = await this.userService.findOne({ email });
        if (existingUser != null) {
            throw Error('User already exists');
        }
        const userId = await this.userService.create({ email, password, name });
        const user = await this.userService.findById(userId);

        await this.activationService.create({ activationId: user.emailHash });
        const link = this.config.activationRoute + user.emailHash;
        await this.emailService.sendEmail('activation', { name, link }, { receiverEmail: email, subject: 'Activation link' });
        return 'Poslat Vam je aktivacioni email';
    }

    async activateUser(activationId) {
        const activation = await this.activationService.findOne({ activationId });
        if (activation == null) {
            throw Error('Bad activation ID');
        }
        // TODO check if expired and throw error or new activation
        await this.userService.activateNewUser(activationId);
        return 'Uspesno ste aktivirali Vas nalog';
    }

    async authorize(username, password) {
        const user = await this._findByUserPass(username, password);
        if (user == null) {
            throw Error('Bad username or password');
        }
        if (user.isActive === false) {
            throw Error('Not activated');
        }
        const tokenId = await this.tokenService.create(user);
        const token = await this.tokenService.findById(tokenId);
        return {
            iat: token.iat,
            exp: token.exp,
            token: token.rawToken,
        };
    }

    async createUserOld(data) {
        const {
            userData, role, roleData,
        } = data;

        const userId = await this.userService.create(userData);
        let id;
        if (role === 'DONOR') {
            id = await this._createDonor({ ...roleData, user: userId });
            await this.userService.updateOne(userId, { donor: id });
        } else if (role === 'RECIPIENT') {
            id = await this._createRecipient({ ...roleData, user: userId });
            await this.userService.updateOne(userId, { recipient: id });
        } else {
            throw Error('Losa vrednost parametra!');
        }
        if (id == null) {
            return userId;
        }
        return id;
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
