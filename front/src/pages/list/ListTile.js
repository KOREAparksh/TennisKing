import {useState} from "react";
import './ListTile.css'

function ListTile() {
  const [stateList, setStateList] = useState([0, 2]);

  const [startTime, setStartTime] = useState("2022-03-22");
  const [facility, setFacility] = useState("다산행정복지시설");
  const [facilityDetail1, setFacilityDetail1] = useState("체육공원2호 체육시설");
  const [facilityDetail2, setFacilityDetail2] = useState("테니스장 코트2");
  const [bookDatesDatas, setBookDatesDatas] = useState(["2022-04-02", "2022-04-03"]);
  const [bookTimesDatas, setBookTimesDatas] = useState([0, 1, 5, 6, 7]);

  const stateStringList = ["대기 중", "취소", "완료"];
  const stateColor = ["Green", "Red", "Blue"];
  const bookTimesList = [
    "1회 06:00 ~ 08:00",
    "2회 08:00 ~ 10:00",
    "3회 10:00 ~ 12:00",
    "4회 12:00 ~ 14:00",
    "5회 14:00 ~ 16:00",
    "6회 16:00 ~ 18:00",
    "7회 18:00 ~ 20:00",
    "8회 20:00 ~ 22:00",
  ];

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
            <div className="ContentsDiv">{startTime}</div>
            <div className="Margin10"></div>
            <div className="TitleDiv">시설</div>
            <div className="ContentsDiv">{facility}</div>
            <div className="Margin10"></div>
            <div className="TitleDiv">시설상세1</div>
            <div className="ContentsDiv">{facilityDetail1}</div>
            <div className="Margin10"></div>
            <div className="TitleDiv">시설상세2</div>
            <div className="ContentsDiv">{facilityDetail2}</div>
          </div>
          <div className="ContentsBlock">
            <div className="Margin10"></div>
            <div className="TitleDivRight">에약일</div>
            <div>
              {bookDatesDatas.map((e) => (
                <div className="ContentsDivRight">
                  {e}
                </div>
              ))}
            </div>
            <div className="Margin25"></div>
            <div className="TitleDivRight">예약회차</div>
            <div>
              {bookTimesDatas.map((e) => (
                <div className="ContentsDivRight">
                  {bookTimesList[e]}
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
