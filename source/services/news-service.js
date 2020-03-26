const models = require('../models');
const utils = require('../utils');

class NewsService {
    constructor({
        logger, config,
    }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No news');
        }

        const news = utils.clone(data);

        if (id != null) {
            news._id = id;
        }

        const result = await models.News.create(news);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);

        return models.News.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.News.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.News.findById(id)
            .populate(fields)
            .lean()
            .exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.News.deleteOne({ _id: id });
    }
}

module.exports = NewsService;
