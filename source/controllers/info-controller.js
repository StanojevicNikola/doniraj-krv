class InfoController {
    constructor(
        {
            logger, config, bloodGroupService, newsService, geolocationService, eventService,
        },
    ) {
        this.logger = logger;
        this.config = config;
        this.bloodGroupService = bloodGroupService;
        this.newsService = newsService;
        this.geolocationService = geolocationService;
        this.eventService = eventService;
    }

    async getNews() {
        return this.newsService.find({});
    }

    async getEvents() {
        return this.eventService.find({});
    }

    async getBloodGroups() {
        return this.bloodGroupService.find({});
    }

    async getCities() {
        return this.geolocationService.find({});
    }
}

module.exports = InfoController;
