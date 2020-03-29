const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates User service operations
 */
class UserService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No user data');
        }

        const user = utils.clone(data);
        if (id != null) {
            user._id = id;
        }

        const passwordHash = utils.hash(user.password, this.config.salt);
        const emailHash = utils.hash(user.email, this.config.salt);
        Object.assign(user, { passwordHash, emailHash });
        Object.assign(user, { isActive: false });
        Object.assign(user, { isAdmin: false });
        delete user.password;
        const result = await models.User.create(user);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        // eslint-disable-next-line max-len
        return models.User.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findByUserPass(username, password) {
        this.logger.debug(`find by username=${username}, password=${password}`);
        const passwordHash = utils.hash(password, this.config.salt);
        return models.User.findOne({ username, passwordHash });
    }

    async findOne(query) {
        this.logger.debug('User: find one');
        return models.User.findOne(query).lean().exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.User.findById(id).populate(fields).lean().exec();
    }

    async updateOne(id, update) {
        this.logger.debug(`updateOne ${id}`);
        return models.User.findOneAndUpdate(
            { _id: id }, update, { useFindAndModify: false },
        )
            .lean()
            .exec();
    }

    async activateNewUser(emailHash) {
        this.logger.debug('Activate new user');
        return models.User.updateOne({ emailHash }, { isActive: true }).lean().exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.User.deleteOne({ _id: id });
    }
}

module.exports = UserService;
