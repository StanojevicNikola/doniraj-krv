const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const models = require('../models');

class TokenService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(user, id = null) {
        const tokenId = id || mongoose.Types.ObjectId();
        const tokenData = {
            tokenId: tokenId.toString(),
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            accessibleRoutes: ['user'],
        };
        // eslint-disable-next-line no-unused-expressions
        user.roles.includes('DONOR') ? (tokenData.donor = true, tokenData.accessibleRoutes.push('donor')) : tokenData.donor = false;
        // eslint-disable-next-line no-unused-expressions
        user.roles.includes('RECIPIENT') ? (tokenData.recipient = true, tokenData.accessibleRoutes.push('recipient')) : tokenData.recipient = false;

        // eslint-disable-next-line no-unused-expressions
        user.isAdmin ? tokenData.accessibleRoutes.push('admin') : undefined;

        const rawTokenData = jwt.sign(tokenData, this.config.jwt.secret, {
            expiresIn: `${this.config.jwt.expirationTime}m`,
        });

        const { iat, exp } = jwt.decode(rawTokenData);
        const result = await models.Token.create({
            _id: tokenId,
            user: user._id,
            iat,
            exp,
            rawToken: rawTokenData,
            data: tokenData,
        });
        return result._id;
    }

    async update(id, token) {
        this.logger.debug(`Token:update(id=${id})`);
        await models.Token.findOneAndUpdate({ _id: id }, { ...token });
    }

    async findOne(query, fields = null) {
        this.logger.debug('Token:find');
        return models.Token.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`Token:findById(id=${id})`);
        return models.Token.findById(id)
            .populate(fields)
            .lean()
            .exec();
    }

    async updateOne(_id, update) {
        this.logger.debug(`updateOne ${_id}`);
        return models.Token.updateOne({ _id }, update).lean().exec();
    }
}

module.exports = TokenService;
