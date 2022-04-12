const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");

const ReserveTime = require("../models/reserve_time");

const logger = require("../modules/logger");
const { addZero, gmt, rentDate } = require("../modules/datetime");

const getRentData = async (sessionId, place, reserveTime, member) => {
    const receiptDate = gmt(reserveTime.receipt_date);
    const rentInputData = {
        category_index: "reservation",
        receipt_date: rentDate(reserveTime.receipt_date),
        year: receiptDate.getFullYear(),
        month: addZero(receiptDate.getMonth() + 1),
        rev_day: addZero(receiptDate.getDate()),
        comcd: place.comcd,
        partcd: place.partcd,
        placecd: place.placecd,
        is_list: "1",
        baseURL: "https://www.nyj.go.kr/rent",
        baseSSL: "https://www.nyj.go.kr/rent",
        select_day: addZero(receiptDate.getDate()),
        select_group: "Y",
        "receipt_time[]": reserveTime.receipt_time,
    };
    const rentInputOptions = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded", cookie: sessionId },
        data: qs.stringify(rentInputData),
        url: "https://www.nyj.go.kr/rent/rent/rentinput",
    };

    return axios(rentInputOptions).then((rentInputProcess) => {
        const $ = cheerio.load(rentInputProcess.data);

        return {
            "receipt_time[]": rentInputData["receipt_time[]"],
            "item_cd_list[]": $('select[name="item_cd_list[]"] option').val(),
            "item_idx_not_list[]": $('input[name="item_idx_not_list[]"]').val(),
            "facility_count[]": $('input[name="facility_count[]"]').val(),
            "time_select[]": $('input[name="time_select[]"]').val(),
            "facility_amt[]": $('input[name="facility_amt[]"]').val(),
            "facility_sale_amt[]": $('input[name="facility_sale_amt[]"]').val(),
            "discount[]": $('select[name="discount[]"] option').val(),
            formcheck: $("#formcheck").val(),
            URL: "https://www.nyj.go.kr/rent",
            SSL: "https://www.nyj.go.kr/rent",
            comcd: rentInputData.comcd,
            sale_amt: $("#sale_amt").val(),
            part_cd: rentInputData.partcd,
            place_cd: rentInputData.placecd,
            team_seq: $("#team_seq").val(),
            payment_total_amt: "5,000", // 이부분 데이터 공정 필요?
            receipt_date: rentInputData.receipt_date,
            select_group: $("#select_group").val(),
            appli_name: "%B4%D9%BB%EA%C5%D7%B4%CF%BD%BA%C5%AC%B7%B4", // 이름 변경 필요
            club_name: "%B4%D9%BB%EA%C5%D7%B4%CF%BD%BA%C5%AC%B7%B4", // 단체이름 변경 필요
            tel: "--", // 고정값
            hp: `010-${$("#hp2").val()}-${$("#hp3").val()}`,
            group_count: member,
            group_count_man: "", // 빈값 넣어야 함
            group_count_woman: "", // 빈값 넣어야 함
            playname: "%C5%D7%B4%CF%BD%BA", // 사용자 입력 필요
            reason: "%BF%EE%B5%BF", // 사용자 입력 필요
            use_time_list: $("#use_time_list").val(),
            use_item_list: $("#use_item_list").val(),
        };
    });
};

const executeRent = async (reserveTimeId, sessionId, rentData, start, intervalId) => {
    const rentOptions = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded", cookie: sessionId },
        data: qs.stringify(rentData),
        url: "https://www.nyj.go.kr/rent/rent/process/rent",
    };

    axios(rentOptions).then(async (rentProcess) => {
        const url = rentProcess.request.res.responseUrl.split("/").slice(-1)[0];
        console.log(rentProcess.headers);
        const reserveTime = await ReserveTime.findOne({ where: { id: reserveTimeId } });

        if (url.match(/[0-9]/g)) {
            if (reserveTime.status !== 1) {
                reserveTime.update({ status: 1 });
                const end = new Date();
                logger.reservation(
                    `Receipt: ${url}, Date: ${rentData.receipt_date}-${rentData["receipt_time[]"]}, Place: ${rentData.comcd}-${
                        rentData.part_cd
                    }-${rentData.place_cd}, Time: ${end - start} seconds`
                );
            }
            clearInterval(intervalId);
        } else if (rentProcess.headers["content-length"] === "5543") {
            if (reserveTime.status === 0) {
                reserveTime.update({ status: 2 });
                const end = new Date();
                logger.reservationFail(
                    `Date: ${rentData.receipt_date}-${rentData["receipt_time[]"]}, Place: ${rentData.comcd}-${rentData.part_cd}-${
                        rentData.place_cd
                    }, Time: ${end - start} seconds`
                );
            }
            clearInterval(intervalId);
        }
    });
};

module.exports = { getRentData, executeRent };
