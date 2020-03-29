const miliseconds = 24 * 60 * 60 * 1000;

module.exports = (days, offset = '-') => {
    const date = new Date();

    if (offset === '+') date.setDate(date.getDate() + days);
    else if (offset === '-') date.setDate(date.getDate() - days);

    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};
