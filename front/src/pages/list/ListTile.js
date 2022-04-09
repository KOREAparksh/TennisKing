import { useNavigate } from "react-router-dom";
import { deleteReserve } from "../../api/api";
import './ListTile.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function ListTile({ id, openTime, place, reserveTimes, status}) {
	const stateStringList = ["대기 중", "완료", "실행 중"];
	const stateColor = ["Green", "Blue", "text-danger"];
	const timeStateStringList = ["", "성공", "실패"];
	const timeStateColor = ["", "Blue", "text-danger"];
	const bookTimeMapper = new Map([
		[6, "1회 06:00 ~ 08:00"],
		[8, "2회 08:00 ~ 10:00"],
		[10, "3회 10:00 ~ 12:00"],
		[12, "4회 12:00 ~ 14:00"],
		[14, "5회 14:00 ~ 16:00"],
		[16, "6회 16:00 ~ 18:00"],
		[18, "7회 18:00 ~ 20:00"],
		[20, "8회 20:00 ~ 22:00"],
	]);
	const navigate = useNavigate();

	const onClickDelete = async () => {
		if (window.confirm('정말 해당 예약을 삭제하시겠습니까?'))
		{
			try{
				await deleteReserve(id).then(function(data) {
					if (data.status !== 200)
					{
						alert("삭제할 수 없는 예약입니다. 관리자에게 문의하세요")
					}
				});
			}
			catch(e){
				alert("오류가 발생했습니다. 관리자에게 문의하세요")
			}

		}
		navigate(0);
	};

	const getDateCode = (e) =>
	{
		return e.getFullYear()+""+e.getMonth()+e.getDate()
	}

	const findStatus = (e) => {
		let answer;
		reserveTimes.find(function (data) {
			if (data.time === e)
				answer = data.status
		});
		return answer
	}

	const getTimeTables = () => {
		var date_set = new Map()
		console.log(reserveTimes)
		reserveTimes.map(function (e){
			const arr = date_set.get(getDateCode(e.time))
			if (typeof(arr) === "object")
				date_set.set(getDateCode(e.time), [...arr, e.time]);
			else
				date_set.set(getDateCode(e.time), [e.time]);
		})
		return (
			[...date_set].map(function (e){
				return (
					<Row key={e.id} className="flex-row-reverse text-end mt-1">
						<div className=" fw-bold px-0">
							{new Date(+e[1][0] +  3240 * 10000).toISOString().slice(0, 10)}
						</div>
						<div>
							{e[1].map((e)=>(
							<div>
								<span className={timeStateColor[findStatus(e)] + " text-left"}>
									{timeStateStringList[findStatus(e)]}
								</span>

								{"  " + bookTimeMapper.get(e.getHours())}
							</div>))}
						</div>
					</Row>
				)
			})
		)
}

  return (
	<Row className="mt-5 mb-4 p-1 g-0 border border-dark text-responsive justify-content-center" style={{ backgroundColor: 'bisque', borderRadius: '1rem', }}>
	  <Row className={"fw-bold flex-row-reverse " + stateColor[status]}>{stateStringList[status]}</Row>
	  <Row className="mb-2 g-0">
		<Col className="px-4 border-end border-dark">
		  <Row className="fw-bold">자동 예약 실행일</Row>
		  <Row className="mb-2">{openTime.toLocaleString("ko")}</Row>

		  <Row className="fw-bold">시설</Row>
		  <Row className="mb-2">{place.com_name}</Row>

		  <Row className="fw-bold">시설상세1</Row>
		  <Row className="mb-2">{place.part_name}</Row>

		  <Row className="fw-bold">시설상세2</Row>
		  <Row>{place.place_name}</Row>
		</Col>
		<Col className="px-4">
		  <Row className="fw-bold flex-row-reverse">예약회차</Row>
		  {getTimeTables()}
		</Col>
	  </Row>
	  <div className="mb-2 btn-group" style={{maxWidth: "250px"}} hidden={status === 0 ? false : true}>
		<Button variant="outline-danger mx-3" size="sm" className="rounded-pill" onClick={onClickDelete}>삭제</Button>
	  </div>
	</Row>
  );
}

export default ListTile;
