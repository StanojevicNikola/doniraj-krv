class AdminController {
    constructor({
        logger, config, placeService, newsService, eventService, geolocationService,
        transactionService, storageService, bloodGroupService,
    }) {
        this.logger = logger;
        this.config = config;
        this.newsService = newsService;
        this.eventService = eventService;
        this.placeService = placeService;
        this.geolocationService = geolocationService;
        this.transactionService = transactionService;
        this.bloodGroupService = bloodGroupService;
        this.storageService = storageService;
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

    async createTransaction(data) {
        const { place, blood, amount } = data;
        const placeId = await this.placeService.findById(place);
        if (placeId == null) {
            throw Error('Izabrali ste nepostojecu lokaciju!');
        }

        const bloodId = await this.bloodGroupService.findById(blood);
        if (bloodId == null) {
            throw Error('Izabrali ste nepostojecu krvnu grupu!');
        }

        // await this.transactionService.create(data);
        await this.storageService.updateBlood(place, blood, amount);
        return { data: null, message: 'Uspesno ste azurirali stanje krvi' };
    }
}

module.exports = AdminController;
