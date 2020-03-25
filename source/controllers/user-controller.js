class UserController {
    constructor({
        logger, config, userService, donorService, receiverService, tokenService,
    }) {
        this.logger = logger;
        this.config = config;
        this.userService = userService;
        this.donorService = donorService;
        this.receiverService = receiverService;
        this.tokenService = tokenService;
    }

    async authorize(username, password) {
        const user = await this._findByUserPass(username, password);
        if (user == null) {
            throw Error('Bad username or password');
        }
        const tokenId = await this.tokenService.create(user);
        const token = await this.tokenService.findById(tokenId);
        return {
            iat: token.iat,
            exp: token.exp,
            token: token.rawToken,
        };
    }

    async createUser(data) {
        const {
            userData, role, roleData,
        } = data;

        const userId = await this.userService.create(userData);
        let id;
        if (role === 'DONOR') {
            id = await this._createDonor({ ...roleData, user: userId });
            await this.userService.updateOne(userId, { donor: id });
        } else if (role === 'RECEIVER') {
            id = await this._createReceiver({ ...roleData, user: userId });
            await this.userService.updateOne(userId, { receiver: id });
        } else {
            throw Error('Losa vrednost parametra!');
        }

        return id;
    }

    async _createDonor(user) {
        return this.donorService.create(user);
    }

    async _createReceiver(user) {
        return this.receiverService.create(user);
    }

    async _findByUserPass(username, password) {
        return this.userService.findByUserPass(username, password);
    }
}


module.exports = UserController;
