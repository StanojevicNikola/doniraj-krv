class TokenController {
    constructor(
        {
            logger, config, tokenService
        },
    ) {
        this.logger = logger;
        this.config = config;
        this.tokenService = tokenService;
    }
}

module.exports = TokenController;
