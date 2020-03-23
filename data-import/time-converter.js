const miliseconds = 24 * 60 * 60 * 1000;

module.exports = (days, offset) => {
    let seconds;

    if (offset === '+') seconds = new Date(Date.now() + days * miliseconds);
    else if (offset === '-') seconds = new Date(Date.now() - days * miliseconds);
    else return null;
    const date = seconds.getDate();
    const month = seconds.getMonth() + 1;
    const year = seconds.getFullYear();

    return `${date}-${month}-${year}`;
};
