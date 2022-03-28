import {useState, useEffect} from "react";

function Reservation()
{
	const [openDate, setOpenDate] = useState(null);
	const [openTime, setOpenTime] = useState(null);
	const [reserveDates, setReserveDates] = useState([new Date()]);

	const onSubmit = () => {
		if (!openDate || !openTime) {
			alert('Check Date or Time');
			return ;
		}
		alert(`${openDate} ${openTime}`);
	}

	const addDate = (e) => {
		e.preventDefault()
		setReserveDates([new Date(), ...reserveDates])
	}

	const [allCheck, setAllCheck] = useState(false);
	const [Check1, setCheck1] = useState(false);
	const [Check2, setCheck2] = useState(false);
	const [Check3, setCheck3] = useState(false);
	const [Check4, setCheck4] = useState(false);
	const [Check5, setCheck5] = useState(false);
	const [Check6, setCheck6] = useState(false);
	const [Check7, setCheck7] = useState(false);
	const [Check8, setCheck8] = useState(false);

	const allBtnEvent =()=>{
		if(allCheck === false) {
			setAllCheck(true);
			setCheck1(true);
			setCheck2(true);
			setCheck3(true);
			setCheck4(true);
			setCheck5(true);
			setCheck6(true);
			setCheck7(true);
			setCheck8(true);
		}else {
			setAllCheck(false);
			setCheck1(false);
			setCheck2(false);
			setCheck3(false);
			setCheck4(false);
			setCheck5(false);
			setCheck6(false);
			setCheck7(false);
			setCheck8(false);
		} 
	};

	const BtnEvent1 =()=>{
		if(Check1 === false) {
		  setCheck1(true)
		}else {
		  setCheck1(false)
		}
	  };
	  const BtnEvent2 =()=>{
		if(Check2 === false) {
		  setCheck2(true)
		}else {
		  setCheck2(false)
		}
	  };
	  const BtnEvent3 =()=>{
		if(Check3 === false) {
		  setCheck3(true)
		}else {
		  setCheck3(false)
		}
	  };
	  const BtnEvent4 =()=>{
		if(Check4 === false) {
		  setCheck4(true)
		}else {
		  setCheck4(false)
		}
	  };
	  const BtnEvent5 =()=>{
		if(Check5 === false) {
		  setCheck5(true)
		}else {
		  setCheck5(false)
		}
	  };
	  const BtnEvent6 =()=>{
		if(Check6 === false) {
		  setCheck6(true)
		}else {
		  setCheck6(false)
		}
	  };
	  const BtnEvent7 =()=>{
		if(Check7 === false) {
		  setCheck7(true)
		}else {
		  setCheck7(false)
		}
	  };
	  const BtnEvent8 =()=>{
		if(Check8 === false) {
		  setCheck8(true)
		}else {
		  setCheck8(false)
		}
	  };

	  useEffect(()=>{
		if(Check1 == true && Check2 == true && Check3 == true && Check4 == true && Check5 == true && Check6 == true && Check7 == true && Check7 == true && Check8 == true){
		  setAllCheck(true)
		} else {
		  setAllCheck(false)
		}
	  }, [Check1,Check2,Check3,Check4,Check5,Check6,Check7,Check8])
	

	return(
		<div className='Container'>
			<form className='Form'>
				<fieldset>
					<legend>새 예약 입력 form</legend>
					<div className='Row'>
						<div className='Title'>
							<formrowtitle className='TitleTag'>
								프로그램 시작시각
							</formrowtitle>
						</div>
						<div className='Input'>
							<input type="date" className='InputTag InputTagText' onChange={(e) => setOpenDate(e.target.value)}>
							</input>
							<input type="time" className='InputTag' onChange={(e) => setOpenTime(e.target.value)}>
							</input>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<formrowtitle className='TitleTag'>
								시설
							</formrowtitle>
						</div>
						<div className='Input'>
							<select id="facility" name="facility" className='Select'>
								<option value="volvo">Volvo</option>
								<option value="saab">Saab</option>
								<option value="fiat">Fiat</option>
								<option value="audi">Audi</option>
							</select>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<formrowtitle className='TitleTag'>
								시설상세1
							</formrowtitle>
						</div>
						<div className='Input'>
							<select id="facility-detail1" name="facility-detail1" className='Select'>
								<option value="volvo">Volvo</option>
								<option value="saab">Saab</option>
								<option value="fiat">Fiat</option>
								<option value="audi">Audi</option>
							</select>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<formrowtitle className='TitleTag'>
								시설상세2
							</formrowtitle>
						</div>
						<div className='Input'>
							<select id="facility-detail2" name="facility-detail2" className='Select'>
								<option value="volvo">Volvo</option>
								<option value="saab">Saab</option>
								<option value="fiat">Fiat</option>
								<option value="audi">Audi</option>
							</select>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<formrowtitle className='TitleTag'>
								인원 수
							</formrowtitle>
						</div>
						<div className='Input'>
							<input type="number" className='InputTag'>
							</input>
						</div>
					</div>
					<div id='BookDate'>
						<div >
							<formrowtitle>
								예약할 날짜 설정
							</formrowtitle>
						</div>
						<div>
							{reserveDates.map((date) => (
								<div className='Input'>
									<input type="date" className='InputTag' value={date.toString()}>
									</input>
								</div>
							))}
						</div>
						<div>
							<button onClick={addDate}>
								날짜 추가
							</button>
						</div>
					</div>

					<div id='BookTime'>
						<formrowtitle>
							회차옵션
						</formrowtitle>
						<div><contents>위 선택한 모든 날짜에 옵션이 적용됩니다.</contents></div>
						<div className='TableDiv'>
							<table border="1">
								<tr>
									<td>
										<input type="checkbox" id='first' name='select_time' checked={Check1} onChange={BtnEvent1}></input>1회: 06:00 ~ 08:00
									</td>
									<td>
										<input type="checkbox" id='fifth' name='select_time' checked={Check5} onChange={BtnEvent5}></input>5회: 14:00 ~ 16:00
									</td>
								</tr>
								<tr>
									<td>
										<input type="checkbox" id='second' name='select_time' checked={Check2} onChange={BtnEvent2}></input>2회: 08:00 ~ 10:00
									</td>
									<td>
										<input type="checkbox" id='sixth' name='select_time' checked={Check6} onChange={BtnEvent6}></input>6회: 16:00 ~ 18:00
									</td>
								</tr>
								<tr>
									<td>
										<input type="checkbox" id='thrid' name='select_time' checked={Check3} onChange={BtnEvent3}></input>3회: 10:00 ~ 12:00
									</td>
									<td>
										<input type="checkbox" id='seven' name='select_time' checked={Check7} onChange={BtnEvent7}></input>7회: 18:00 ~ 20:00
									</td>
								</tr>
								<tr>
									<td>
										<input type="checkbox" id='four' name='select_time' checked={Check4} onChange={BtnEvent4}></input>4회: 12:00 ~ 14:00
									</td>
									<td>
										<input type="checkbox" id='eight' name='select_time' checked={Check8} onChange={BtnEvent8}></input>8회: 20:00 ~ 22:00
									</td>
								</tr>
							</table>
							<input type="checkbox" id='all' name='all' checked={allCheck} onChange={allBtnEvent}></input>전체선택
						</div>

					</div>

					<div className='Row'>
						<div className='Title'>
							<formrowtitle className='TitleTag'>
								저기 그 부가옵션
							</formrowtitle>
						</div>
						<div className='Input' >
							<div id='OptionDiv'>
								<input type="checkbox" id='option1' name='option1'/>조명
							</div>
						</div>
					</div>

					<button onClick={onSubmit}>예약</button>

				</fieldset>
			</form>
		</div>
	);
}

export default Reservation;
