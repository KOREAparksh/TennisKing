import './Main.css'
import { Link } from "react-router-dom";

function Main()
{

	const onTapNewButton = () =>{

	}

	const onTapBookListButton = () => {

	}

	return (
		<div id="Container">
			<div>
				<Link to="/reservation">
					<div><button className="Button" onClick={onTapNewButton}>새 예약</button></div>
				</Link>
				<div className="Margin50"></div>
				<Link to="/list">
					<div><button className="Button" onClick={(onTapBookListButton)}>예약 조회</button></div>
				</Link>
				<div className="Margin50"></div>
				<div id="VersionText">현재 버전 v0.1</div>
			</div>
		</div>
	);
}

export default Main;
