import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { deleteReserve } from "../../api/api";
import './ListTile.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function ListTile({ id, openTime, place, reserveTimes }) {
  const stateStringList = ["대기 중", "취소", "완료"];
  const stateColor = ["Green", "Red", "Blue"];
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
  const [stateList, setStateList] = useState([0, 2]);
  const navigate = useNavigate();

  const onClickModify = () => {
    navigate(`/modify/${id}`);
  };

  const onClickDelete = async () => {
    alert('정말 해당 예약을 삭제하시겠습니까?');
    await deleteReserve(id);
    navigate(0);
  };

  return (
    <Row className="mt-5 mb-4 p-1 g-0 border border-dark text-responsive justify-content-center" style={{ backgroundColor: 'bisque', borderRadius: '1rem', }}>
      <Row className={"fw-bold flex-row-reverse " + stateColor[stateList[0]]}>{stateStringList[stateList[0]]}</Row>
      <Row className="mb-2 g-0">
        <Col className="px-4 border-end border-dark">
          <Row className="fw-bold">자동 예약 실행일</Row>
          <Row className="mb-2">{openTime.toLocaleString()}</Row>

          <Row className="fw-bold">시설</Row>
          <Row className="mb-2">{place.com_name}</Row>
          
          <Row className="fw-bold">시설상세1</Row>
          <Row className="mb-2">{place.part_name}</Row>

          <Row className="fw-bold">시설상세2</Row>
          <Row>{place.place_name}</Row>
        </Col>
        <Col className="px-4">
          <Row className="fw-bold flex-row-reverse">예약회차</Row>
          {reserveTimes.map((e) => (
            <Row key={e.time} className="flex-row-reverse text-end">
              {`${e.time.toLocaleDateString()} ${bookTimeMapper.get(e.time.getHours())}`}
            </Row>
          ))}
        </Col>
      </Row>
      <div className="mb-2 btn-group" style={{maxWidth: "250px"}}>
        <Button variant="outline-dark mx-3" size="sm" className="rounded-pill mb-1" onClick={onClickModify}>수정</Button>
        <Button variant="outline-danger mx-3" size="sm" className="rounded-pill" onClick={onClickDelete}>삭제</Button>
      </div>
    </Row>
  );
}

export default ListTile;
