const axios = require("axios");
const qs = require("qs");

const executeRent = async (sessionId, rentData) => {
    const rentOptions = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded", cookie: sessionId },
        data: qs.stringify(rentData),
        url: "https://www.nyj.go.kr/rent/rent/process/rent",
    };

    await axios(rentOptions);
};

module.exports = executeRent;
