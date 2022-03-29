import './Main.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPlaces} from "../../api/api";

function Main() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    console.log("123");
    getPlaces().then(() => setLoading(false)); // 토큰 확인용
  }, [])

  const onTapNewButton = () => {

  }

  const onTapBookListButton = () => {

  }

  return (<div id="Container">
      {isLoading ? (<h1>Loading...</h1>) : (<div>
          <Link to="/reservation">
            <div>
              <button className="Button" onClick={onTapNewButton}>새 예약</button>
            </div>
          </Link>
          <div className="Margin50"></div>
          <Link to="/list">
            <div>
              <button className="Button" onClick={(onTapBookListButton)}>예약 조회</button>
            </div>
          </Link>
          <div className="Margin50"></div>
          <div id="VersionText">현재 버전 v0.1</div>
        </div>
      )}
    </div>);
}

export default Main;
