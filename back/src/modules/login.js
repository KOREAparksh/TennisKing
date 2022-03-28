const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const getSessionId = async () => {
    const loginData = {
        process_check: "login",
        ret_url: "",
        memid: process.env.NYJ_USERNAME,
        mempw: process.env.NYJ_PASSWORD,
    };
    const loginOptions = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(loginData),
        url: "https://www.nyj.go.kr/rent/member/process",
    };
    const loginProcess = await axios(loginOptions);
    const cookies = loginProcess.headers["set-cookie"];

    return cookies[2].split(" ")[0];
};

module.exports = getSessionId;
