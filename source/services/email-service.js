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

    async handleEmail(type, params, options) {
        const msg = await this.prepareTemplate(type, params);
        const result = await this.sendEmail(msg, options);
        console.log('RESULT', result);
        return result;
    }

    async prepareTemplate(type, params) {
        let preparedTemplate = fs.readFileSync(`email-templates/${type}-template.html`, 'utf-8');
        Object.keys(params).forEach((param) => {
            preparedTemplate = preparedTemplate.replace(`[${param}]`, params[param]);
        });
        return preparedTemplate;
    }

    async sendEmail(msg, options) {
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
