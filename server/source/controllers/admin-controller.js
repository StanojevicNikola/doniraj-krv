class AdminController {
    constructor({
        logger, config, placeService, newsService, eventService, geolocationService,
    }) {
        this.logger = logger;
        this.config = config;
        this.newsService = newsService;
        this.eventService = eventService;
        this.placeService = placeService;
        this.geolocationService = geolocationService;
    }

    // TODO add validation of data
    async createNews(data) {
        return this.newsService.create(data);
    }

    async updateNews(id, query) {
        return this.newsService.updateOne({ _id: id }, query);
    }

    async createEvent(data) {
        return this.eventService.create(data);
    }

    async updateEvent(id, query) {
        return this.eventService.updateOne({ _id: id }, query);
    }

    async createPlace(data) {
        return this.placeService.create(data);
    }

    async updatePlace(id, query) {
        return this.placeService.updateOne({ _id: id }, query);
    }
}

module.exports = AdminController;
