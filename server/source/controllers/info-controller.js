class InfoController {
    constructor({
        logger,
        config,
        bloodGroupService,
        newsService,
        geolocationService,
        eventService,
        placeService,
    }) {
        this.logger = logger;
        this.config = config;
        this.bloodGroupService = bloodGroupService;
        this.newsService = newsService;
        this.geolocationService = geolocationService;
        this.eventService = eventService;
        this.placeService = placeService;
    }

    async getNews() {
        return this.newsService.find({});
    }

    async getPlaces() {
        return this.placeService.find({}, ['geolocation']);
    }

    async getEvents() {
        return this.eventService.find({}, ['geolocation']);
    }

    async getBloodGroups() {
        return this.bloodGroupService.find({});
    }

    async getCities() {
        return this.geolocationService.find({});
    }
}

module.exports = InfoController;
