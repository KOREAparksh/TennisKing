const { gmt } = require("./datetime");

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
    const member = parseInt(req.body.member, 10);
    const facility = parseInt(req.body.use_facility, 10);
    if (isNaN(facility) || isNaN(member) || isNaN(placeId)) {
        throw errMessages.PARSE_ERROR;
    }

    const toReceiptTime = (time) => {
        const hour = new Date(time).getHours();
        return parseInt(hour / 2, 10) - 3 +
            (placeId === 1 ? 1833 : placeId === 2 ? 2210 : hour < 18 ? 2218 : hour === 18 ? 3305 : 2893);
    };
    const toReserveTImes = (times) => {
        if (times == null) {
            return null;
        }
        return times.map(time => {
            return {
                receipt_date: new Date(time),
                receipt_time: toReceiptTime(time),
            };
        });
    }

    const reserveTimes = toReserveTImes(req.body.reserve_times);
    if (reserveTimes != null) {
        return {
            open_time: openTime,
            member: member,
            place_id: placeId,
            use_facility: facility,
            ReserveTimes: reserveTimes,
        };
    } else {
        const newReserveTimes = toReserveTImes(req.body.new_reserve_times);
        const deleteReserveTimes =  toReserveTImes(req.body.delete_reserve_times);
        return {
            open_time: openTime,
            member: member,
            place_id: placeId,
            use_facility: facility,
            new_reserve_times: newReserveTimes,
            delete_reserve_times: deleteReserveTimes,
        };
    }
}

const toResponse = (reserve) => {
    reserve.open_time = gmt(reserve.open_time);
    reserve.ReserveTimes.map(date => {
        date = date.dataValues;
        date.time = gmt(date.time);
    })
    return {
        id: reserve.id,
        open_time: reserve.open_time,
        place_id: reserve.place_id,
        member: reserve.member,
        reserve_times: reserve.ReserveTimes,
        use_facility: reserve.use_facility,
        status: reserve.status
    }
};

module.exports = { getReserveData, toResponse};