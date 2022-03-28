import './Main.css'

function Main()
{

	const onTapNewButton = () =>{

	}

	const onTapBookListButton = () => {

	}

	return (
		<div id="Container">
			<div>
				<div><button className="Button" onClick={onTapNewButton}>새 예약</button></div>
				<div className="Margin50"></div>
				<div><button className="Button" onClick={(onTapBookListButton)}>예약 조회</button></div>
				<div className="Margin50"></div>
				<div id="VersionText">현재 버전 v0.1</div>
			</div>
		</div>
	);
}

export default Main;
