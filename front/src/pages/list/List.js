import { useEffect, useState } from "react";
import ListTile from "./ListTile";
import { getPlaces, getReserves } from "../../api/api";

function parseDate(dateString) {
  const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
  const [, year, month, day, hour, minute, second] = regex.exec(dateString);
  return new Date(year, month, day, hour, minute, second,);
}

function List() {
  const [reserves, setReserves] = useState([]);

  useEffect(() => {
    (async () => {
      const places = await getPlaces();
      const reserves = await getReserves();
      setReserves(
        reserves.map((reserve) => {
          const place = places.find((place) => place.id === reserve.place_id);
          const times = reserve.reserve_times.map((e) => ({
            ...e,
            time: parseDate(e.time),
          }));
          return {
            ...reserve,
            open_time: parseDate(reserve.open_time),
            reserve_times: times,
            place,
          };
        })
      );
    })();
  }, []);

  return (
    <div>
      {reserves.map((reserve) => (
        <ListTile
          key={reserve.id}
          id={reserve.id}
          openTime={reserve.open_time}
          place={reserve.place}
          reserveTimes={reserve.reserve_times}
        />
      ))}
    </div>
  );
}

export default List;
