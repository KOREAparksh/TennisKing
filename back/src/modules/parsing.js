const { gmt } = require("./datetime");
const Reserve = require("../models/reserve");

const errMessages = {
    RESERVE_ERROR: "Outdated Reservatation",
    PARSE_ERROR: "Parse Error",
};

const getReserveData = (req) => {
    const openTime = new Date(req.body.open_time);
    const today = new Date();
    if (today > openTime) {
        throw errMessages.RESERVE_ERROR;
    }
    const placeId = parseInt(req.body.place_id, 10);
    const login = req.body.login;
    const password = req.body.password;
    const member = parseInt(req.body.member, 10);
    const facility = parseInt(req.body.use_facility, 10);
    if (isNaN(facility) || isNaN(member) || isNaN(placeId) || !login.length || !password.length) {
        throw errMessages.PARSE_ERROR;
    }

    const toReceiptTime = (time) => {
        const hour = new Date(time).getHours();
        const timeRule = (hour, placeId) => {
            if (hour === 18) {
                return 3308 + placeId;
            } else if (hour === 20) {
                return 2897 + placeId;
            } else if (hour === 6 || hour === 8 || hour === 10 || hour === 12 || hour === 14 || hour === 16) {
                const baseline = placeId === 1 ? 1833 : placeId === 2 ? 2210 : 2218;
                return baseline + hour / 2 - 3;
            }
        };
        const receiptTime = timeRule(parseInt(hour), placeId);
        if (isNaN(receiptTime)) {
            throw errMessages.PARSE_ERROR;
        }
        return receiptTime;
    };
    const toReserveTimes = (times) => {
        if (times == null) {
            return null;
        }
        return times.map((time) => {
            return {
                receipt_date: new Date(time),
                receipt_time: toReceiptTime(time),
            };
        });
    };

    const reserveTimes = toReserveTimes(req.body.reserve_times);
    if (reserveTimes != null) {
        return {
            open_time: openTime,
            login: login,
            password: password,
            member: member,
            place_id: placeId,
            use_facility: facility,
            ReserveTimes: reserveTimes,
        };
    } else {
        const newReserveTimes = toReserveTimes(req.body.new_reserve_times);
        const deleteReserveTimes = toReserveTimes(req.body.delete_reserve_times);
        if (newReserveTimes == null || deleteReserveTimes == null) {
            throw errMessages.PARSE_ERROR;
        }
        return {
            open_time: openTime,
            member: member,
            place_id: placeId,
            use_facility: facility,
            new_reserve_times: newReserveTimes,
            delete_reserve_times: deleteReserveTimes,
        };
    }
};

const toResponse = (reserve) => {
    reserve.open_time = gmt(reserve.open_time);
    if (reserve.status !== 1 && reserve.status !== 3 && reserve.ReserveTimes.filter((value) => value.status === 0).length === 0) {
        Reserve.update({ status: 1 }, { where: { id: reserve.id } });
        reserve.id = 1;
    }

    reserve.ReserveTimes.map((date) => {
        date = date.dataValues;
        date.time = gmt(date.time);
    });
    return {
        id: reserve.id,
        open_time: reserve.open_time,
        place_id: reserve.place_id,
        login: reserve.login,
        member: reserve.member,
        reserve_times: reserve.ReserveTimes,
        use_facility: reserve.use_facility,
        status: reserve.status,
    };
};

module.exports = { getReserveData, toResponse };
