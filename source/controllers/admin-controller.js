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

    async createNews(body) {
        const { title, description, date } = body;
        const data = {
            title,
            description,
            date,
        };
        return this.newsService.create(data);
    }

    async updateNews(_title, body) {
        const id = { title: _title };
        const { title, description, date } = body;
        const data = { title, description, date };

        return this.newsService.updateOne(id, data);
    }

    async createEvent(body) {
        const {
            title, description, date, hour, city, lat, lng,
        } = body;
        const geo_ref = {
            city,
            lat,
            lng,
        };
        const geo_id = await this.geolocationService.create(geo_ref);

        const data = {
            title,
            description,
            date,
            hour,
            geolocation: geo_id,
        };

        return this.eventService.create(data);
    }

    async updateEvent(_title, body) {
        const {
            title, description, date, hour, city, lat, lng,
        } = body;
        let geo_id = await this.geolocationService.findOne({ city });
        const geo_data = {
            city,
            lat,
            lng,
        };

        if (geo_id === null) geo_id = await this.geolocationService.create(geo_data);

        const id = { title: _title };
        const data = {
            title,
            description,
            date,
            hour,
            geolocation: geo_id,
        };

        return this.eventService.updateOne(id, data);
    }

    async createPlace(body) {
        const {
            address, name, description, workingHours, date, isStatic, city, lat, lng,
        } = body;
        const geo_ref = {
            city,
            lat,
            lng,
        };
        const geo_id = await this.geolocationService.create(geo_ref);

        const data = {
            address,
            name,
            description,
            workingHours,
            date,
            isStatic,
            geolocation: geo_id,
        };

        return this.placeService.create(data);
    }

    async updatePlace(_name, body) {
        const {
            address, name, description, workingHours, date, isStatic, city, lat, lng,
        } = body;
        let geo_id = await this.geolocationService.findOne({ city });
        const geo_data = {
            city,
            lat,
            lng,
        };

        if (geo_id === null) geo_id = await this.geolocationService.create(geo_data);

        const id = { name: _name };
        const data = {
            address,
            name,
            description,
            workingHours,
            date,
            isStatic,
            geolocation: geo_id,
        };

        return this.placeService.updateOne(id, data);
    }
}

module.exports = AdminController;
