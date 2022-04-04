import './Main.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPlaces} from "../../api/api";

function Main() {
  const [isLoading, setLoading] = useState(true);
  //const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log("123");
    getPlaces().then(() => setLoading(false)); // 토큰 확인용
  }, [])

  return (<div><div id="Container">
      {isLoading ? (<h1>Loading...</h1>) : (<div className="w-50">
          <Link to="/reservation">
            <div>
              <button className="btn btn-outline-secondary border-dark rounded-pill btn-lg mb-5 fs-6" >새 예약</button>
            </div>
          </Link>
          <Link to="/list">
            <div>
              <button className="btn btn-outline-secondary border-dark rounded-pill btn-lg fs-6">예약 조회</button>
            </div>
          </Link>
        </div>
      )}
    </div>
    <div id="VersionText" className="text text-muted fw-lighter text-center">현재 버전 v0.1</div>
  </div>);
}

export default Main;
