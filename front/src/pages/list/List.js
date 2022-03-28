import {useState} from "react";
import './List.css'

function List()
{
	const [stateList, setStateList] = useState([0, 2]);
	const stateStringList = ["대기 중", "취소", "완료"];
	const stateColor = ["Green", "Red", "Blue"];

	return (
		<div id="Container">
			<div className="ListTile">
				<div className="Margin25"/>
				<div className={'StateContainer ' + stateColor[stateList[0]]}>{stateStringList[stateList[0]]}</div>
				<div className="Margin25"/>
				<div id="ContentsContainer">
					<div className="Contents">
						<span className="Title">예약프로그램 시작 시각</span>
						<span className="Title"></span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default List;
