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
        };
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
            isActive: true,
        });
        return result._id;
    }

    async update(id, token) {
        this.logger.debug(`Token:update(id=${id})`);
        await models.Token.findOneAndUpdate({ _id: id }, { ...token });
    }

    async find(query, fields = null) {
        this.logger.debug('Token:find');
        return models.Token.find(query)
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
}

module.exports = TokenService;
