import {useState} from "react";

function Reservation()
{
	const getToday = () =>{
		const date = new Date();
		const y = date.getFullYear();
		const temp = date.getMonth() + 1;
		var m;
		if (temp.toString().length < 2)
			m = "0" + temp.toString();
		else
			m = temp.toString();
		const d = date.getDate();
		return y+"-"+m+"-"+d;
	}

	const today = getToday();
	const [min, setMin] = useState("2022-02-25");
	const [openDate, setOpenDate] = useState(null);
	const [openTime, setOpenTime] = useState(null);
	const [reserveDates, setReserveDates] = useState([new Date()]);



	const getSetDay = (e) => {
		const date = document.getElementById('setStartDate').value;
		setMin(date);
		setOpenDate(e.target.value);
	}

	const onSubmit = () => {
		if (!openDate || !openTime) {
			alert('Check Date or Time');
			return false;
		}
		if (document.getElementById('facility').value === '')
		{
			alert('Check Date or Time');
			return false;
		}
		alert(`${openDate} ${openTime}`);
		return false;
	}

	const addDate = (e) => {
		e.preventDefault()
		setReserveDates([new Date(), ...reserveDates])
	}

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
							<input id="setStartDate" min={today} type="date" className='InputTag InputTagText' onChange={getSetDay} required>
							</input>
							<input type="time" className='InputTag' onChange={(e) => setOpenTime(e.target.value)} required>
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
							<select id="facility" name="facility" className='Select' required>
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
							<select id="facility-detail1" name="facility-detail1" className='Select' required>
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
							<select id="facility-detail2" name="facility-detail2" className='Select' required>
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
							<input type="number" className='InputTag' required>
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
								<div id="InputDate">
									<input type="date" className='InputTag' min={min} required>
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
										<input type="checkbox" id='first' name='first'></input>1회: 06:00 ~ 08:00
									</td>
									<td>
										<input type="checkbox" id='fifth' name='fifth'></input>5회: 14:00 ~ 16:00
									</td>
								</tr>
								<tr>
									<td>
										<input type="checkbox" id='second' name='second'></input>2회: 08:00 ~ 10:00
									</td>
									<td>
										<input type="checkbox" id='sixth' name='sixth'></input>6회: 16:00 ~ 18:00
									</td>
								</tr>
								<tr>
									<td>
										<input type="checkbox" id='thrid' name='thrid'></input>3회: 10:00 ~ 12:00
									</td>
									<td>
										<input type="checkbox" id='seven' name='seven'></input>7회: 18:00 ~ 20:00
									</td>
								</tr>
								<tr>
									<td>
										<input type="checkbox" id='four' name='four'></input>4회: 12:00 ~ 14:00
									</td>
									<td>
										<input type="checkbox" id='eight' name='eight'></input>8회: 20:00 ~ 22:00
									</td>
								</tr>
							</table>
							<input type="checkbox" id='all' name='all'></input>전체선택
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

					<button type="submit" onClick={onSubmit}>예약</button>

				</fieldset>
			</form>

		</div>
	);
}

export default Reservation;
