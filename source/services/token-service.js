const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const models = require('../models');

class TokenService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    signToken(tokenData) {
        return jwt.sign(tokenData, this.config.jwt.secret, {
            expiresIn: `${this.config.jwt.expirationTime}m`,
        });
    }

    async create(user, id = null) {
        const tokenId = id || mongoose.Types.ObjectId();
        const tokenData = {
            tokenId: tokenId.toString(),
            userId: user._id.toString(),
            name: user.name,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            accessibleRoutes: ['user'],
        };
        // eslint-disable-next-line no-unused-expressions
        user.roles.includes('DONOR') ? (tokenData.donor = user.donor, tokenData.accessibleRoutes.push('donor')) : tokenData.donor = null;
        // eslint-disable-next-line no-unused-expressions
        user.roles.includes('RECIPIENT') ? (tokenData.recipient = user.recipient, tokenData.accessibleRoutes.push('recipient')) : tokenData.recipient = null;

        // eslint-disable-next-line no-unused-expressions
        user.isAdmin ? tokenData.accessibleRoutes.push('admin') : undefined;

        const rawTokenData = this.signToken(tokenData);

        const { iat, exp } = jwt.decode(rawTokenData);
        const result = await models.Token.create({
            _id: tokenId,
            iat,
            exp,
            rawToken: rawTokenData,
            data: tokenData,
        });
        return result._id;
    }

    async update(id, token) {
        this.logger.debug(`Token:update(id=${id})`);
        await models.Token.findOneAndUpdate({ _id: id }, { ...token }, { useFindAndModify: false });
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

    async updateOne(id, update) {
        this.logger.debug(`updateOne ${id}`);
        return models.Token.updateOne({ _id: id }, update).lean().exec();
    }
}

module.exports = TokenService;
