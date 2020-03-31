
class TimeService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    getTimeWithOffset(days = 0, offset = '+') {
        const date = new Date();

        if (offset === '+') date.setDate(date.getDate() + days);
        else if (offset === '-') date.setDate(date.getDate() - days);

        return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
}

module.exports = TimeService;
