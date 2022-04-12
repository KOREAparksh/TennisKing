import { useEffect, useState } from "react";
import ListTile from "./ListTile";
import { getPlaces, getReserves } from "../../api/api";
import { parseDate } from "../../util/date";
import Container from 'react-bootstrap/Container';

function List() {
	const [reserves, setReserves] = useState([]);

	useEffect(() => {
		(async () => {
			const temp = await getPlaces();
			const places = temp.data
			const reserves = await getReserves();
			console.log(reserves)
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

	const getListTiles = () => {
		if (reserves.length <= 0)
			return (<h1 className="text-center">텅...</h1>)
		return (
			reserves.map((reserve, index) => (
				<ListTile
					key={index}
					id={reserve.id}
					openTime={reserve.open_time}
					place={reserve.place}
					reserveTimes={reserve.reserve_times}
					status={reserve.status}
				/>
		)))
	}

	return (
		<div>
			<div className="text-center bold fs-1 mt-5"><strong>예약 리스트</strong></div>
			<div className="text-center bold fs-6">이미 실행된 예약 건은 삭제할 수 없습니다.</div>
			<Container style={{maxWidth: "500px"}}>
				{getListTiles()}
			</Container>
		</div>
	);
}

export default List;
