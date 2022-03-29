import {useState} from "react";
import './ListTile.css'

function ListTile({ id, openTime, place, reserveTimes }) {
  const [stateList, setStateList] = useState([0, 2]);
  const [facility, setFacility] = useState("다산행정복지시설");
  const [facilityDetail1, setFacilityDetail1] = useState("체육공원2호 체육시설");
  const [facilityDetail2, setFacilityDetail2] = useState("테니스장 코트2");
  const [bookDatesDatas, setBookDatesDatas] = useState(["2022-04-02", "2022-04-03"]);
  const [bookTimesDatas, setBookTimesDatas] = useState([0, 1, 5, 6, 7]);

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

  return (
    <div id="Container">
      <div className="ListTile">
        <div className="Margin25"/>
        <div className={'StateContainer ' + stateColor[stateList[0]]}>{stateStringList[stateList[0]]}</div>
        <div className="Margin10"/>
        <div id="ContentsContainer">
          <div className="ContentsBlock">
            <div className="Margin10"></div>
            <div className="TitleDiv">프로그램 예약 시작 시간</div>
            <div className="ContentsDiv">{openTime.toLocaleString()}</div>
            <div className="Margin10"></div>
            <div className="TitleDiv">시설</div>
            <div className="ContentsDiv">{place.com_name}</div>
            <div className="Margin10"></div>
            <div className="TitleDiv">시설상세1</div>
            <div className="ContentsDiv">{place.part_name}</div>
            <div className="Margin10"></div>
            <div className="TitleDiv">시설상세2</div>
            <div className="ContentsDiv">{place.place_name}</div>
          </div>
          <div className="ContentsBlock">
            <div className="Margin10"></div>
            <div className="TitleDivRight">예약회차</div>
            <div>
              {reserveTimes.map((e) => (
                <div key={e.time} className="ContentsDivRight">
                  {`${e.time.toLocaleDateString()} ${bookTimeMapper.get(e.time.getHours())}`}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="Margin25"/>
        <div id="ButtonDiv">
          <button className="Button">수정</button>
          <div className="Margin10"></div>
          <button className="Button">삭제</button>
          <div className="Margin25"></div>
        </div>
      </div>
    </div>
  );
}

export default ListTile;
