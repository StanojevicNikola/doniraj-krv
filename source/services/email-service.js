const nodemailer = require('nodemailer');
const fs = require('fs');

/**
 * Encapsulates Email service operations
 */
class EmailService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
        this.smtpTransport = nodemailer.createTransport(this.config.email);
    }

    async sendEmail(type, params, options) {
        const msg = await this._prepareMsg(type, params);
        return this._send(msg, options);
    }

    async _prepareMsg(type, params) {
        let preparedTemplate = fs.readFileSync(`email-templates/${type}-template.html`, 'utf-8');
        Object.keys(params).forEach((param) => {
            preparedTemplate = preparedTemplate.replace(`[${param}]`, params[param]);
        });
        return preparedTemplate;
    }

    async _send(msg, options) {
        const mailOptions = {
            from: this.config.email.username,
            to: options.receiverEmail,
            subject: options.subject || 'DONIRAJ!',
            html: msg,
        };

        return this.smtpTransport.sendMail(mailOptions);
    }
}

module.exports = EmailService;
