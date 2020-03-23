const models = require('../models');
const utils = require('../utils');

class NewsService {
    constructor(
        logger, config,
    ) {
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
}

module.exports = NewsService;
