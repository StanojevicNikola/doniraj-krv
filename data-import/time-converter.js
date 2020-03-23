const miliseconds = 24 * 60 * 60 * 1000;

module.exports = (daysBefore) => {
    const date_ob = new Date(Date.now() - daysBefore * miliseconds);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();

    return `${date}-${month}-${year}`;
};
