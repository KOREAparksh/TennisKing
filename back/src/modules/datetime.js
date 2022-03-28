const addZero = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
};

const gmt = (date) => {
    const koreaTimeDiff = 9 * 60 * 60 * 1000;

    return new Date(date.getTime() + koreaTimeDiff);
};

const rentDate = (date) => {
    return `${date.getFullYear()}${addZero(date.getMonth() + 1)}${addZero(date.getDate())}`;
};

module.exports = { addZero, gmt, rentDate };
