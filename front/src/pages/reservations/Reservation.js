import {useState, useEffect} from "react";
import { getPlaces, postReserves } from "../../api/api";
import {Link} from "react-router-dom";
import './Reservation.css'
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
	const facility_default = "다산 행정복지센터"
	const facility1_default = "체육공원2호 체육시설"

	const [loading, setLoading] = useState(true);
	const [isStartDateChecked, setIsStartDateChecked] = useState(false);
	const [min, setMin] = useState("2022-02-25");
	const [placeList, setPlaceList] = useState([]);
	const [facility, setFacility] = useState([]);
	const [facility_detail1, setFacilityDetail1] = useState([]);
	const [facility_detail2, setFacilityDetail2] = useState([]);
	const [openDate, setOpenDate] = useState(null);
	const [openTime, setOpenTime] = useState(null);
	const [reserveDates, setReserveDates] = useState([new Date(0,0)]);
	const [person, setPerson] = useState(0); // 인원수
	const [option1, setOption1] = useState(false)


	useEffect(async () => {
		await getPlaces().then(
			function (data){
				data.push({
					"id": 111,
					"com_name": "개포 근린공원",
					"part_name": "서쪽공원",
					"place_name": "철봉1",
					"comcd": "NYJ06",
					"partcd": "07",
					"placecd": "103",
					"facility": 99,
				  },
				  {
					"id": 122,
					"com_name": "개포 근린공원",
					"part_name": "동쪽공원",
					"place_name": "철봉2",
					"comcd": "NYJ046",
					"partcd": "073",
					"placecd": "1023",
					"facility": 919,
				  },{
					"id": 1,
					"com_name": "개포 근린공원",
					"part_name": "동쪽공원",
					"place_name": "철봉1",
					"comcd": "NYJ1106",
					"partcd": "0117",
					"placecd": "11103",
					"facility": 199,
				  }) // testcase
				setPlaceList(data);
				data.map(function (data, index){
					facility.push(data["com_name"]);
					const temp = new Set(facility);
					setFacility([...temp]);
					setLoading(false);
				});
				const value1 = facility_default;
				const arr1 = data.filter(data => data.com_name === value1.toString())
				const part_name_arr1 = arr1.map(data => data.part_name);
				const temp1 = new Set(part_name_arr1)
				setFacilityDetail1([...temp1]);

				const value2 = facility1_default;
				const arr2 = data.filter(data => data.part_name === value2.toString())
				const part_name_arr2 = arr2.map(data => data.place_name);
				const temp2 = new Set(part_name_arr2)
				setFacilityDetail2([...temp2]);

				console.log(value2)
				console.log(arr2)
				console.log(part_name_arr2)

				setLoading(false);

			}
		);
	}, [1])

	const getSetDay = (e) => {
		const date = document.getElementById('setStartDate').value;
		setMin(date);
		setOpenDate(e.target.value);
		setIsStartDateChecked(true)
	}

	const onClickReserveDate = (e, index) =>
	{
		const dates = [...reserveDates]
		dates[index] = new Date(e.target.value);
		setReserveDates(dates);
	}

	const addDate = (e) => {
		e.preventDefault()
		const new_dates = [...reserveDates]
		new_dates.push(new Date(0, 0))
		console.log(new_dates);
		setReserveDates(new_dates)
		// setReserveDates([new Date(), ...reserveDates])
	}

	const deleteDate = (e) =>{
		e.preventDefault()
		const new_dates = [...reserveDates]
		if (new_dates.length > 1)
			new_dates.pop();
		setReserveDates(new_dates);
	}

	const onChangeFacility = (e) =>{
		const value = e.target.value;
		const arr = placeList.filter(data => data.com_name === value.toString())
		const part_name_arr = arr.map(data => data.part_name);
		const temp = new Set(part_name_arr)
		setFacilityDetail1([...temp]);
		const value2 = part_name_arr[0] ?? "";
		console.log(value2)
		const arr2 = placeList.filter(data => data.part_name === value2.toString())
		const part_name_arr2 = arr2.map(data => data.place_name);
		const temp2 = new Set(part_name_arr2)
		setFacilityDetail2([...temp2]);

	}

	const onChangeFacilityDetail1 = (e) =>{
		const value = e.target.value;
		const arr = placeList.filter(data => data.part_name === value.toString())
		const part_name_arr = arr.map(data => data.place_name);
		const temp = new Set(part_name_arr)
		setFacilityDetail2([...temp]);
	}

	const onClickOption1 = (e) => {
		console.log("#")
		if (option1 === false)
			setOption1(true)
		else
			setOption1(false)
	}

	const onSubmit = (event) => {
		if (!openDate || !openTime) {
			alert('프로그램 시작 시간을 확인하세요');
			event.preventDefault();
			return false;
		}
		//if()
		//{

		//}
		if(person <= 0)
		{
			alert('인원수를 바르게 적어주세요')
			event.preventDefault();
			return false;
		}
		const dates = [...reserveDates]
		const len = dates.length;
		if(len === 1 && dates[0].getFullYear() === 1900)
		{
			alert('예약할 날짜를 설정하세요')
			event.preventDefault();
			return false;
		}
		for(let i = 0; i <len; i++)
		{
			if(dates[i].getFullYear() === 1900)
			{
				alert('예약할 날짜를 모두 설정하세요')
				event.preventDefault();
				return false;
			}
		}
		if(Check1 === false && Check2 === false && Check3 === false && Check4 === false && Check5 === false && Check6 === false && Check7 === false && Check7 === false && Check8 === false)
		{
			alert('회차를 선택하세요.')
			event.preventDefault();
			return false;
		}


		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		const open_date = new Date(openDate + " " + openTime)
		console.log(openDate)
		console.log(openTime)
		console.log(open_date)
		const com_name = document.getElementById('facility').value
		const part_name = document.getElementById('facility-detail1').value
		const place_name = document.getElementById('facility-detail2').value
		const place_id = placeList.filter((data) => {
			if (data.com_name === com_name && data.part_name === part_name
						&& data.place_name === place_name)
					return true;
			return false;
		})[0].facility
		console.log(place_id)
		console.log(person)
		const reserve_times = []
		const hour_mili = 60 * 60 * 1000;
		reserveDates.map(function (data, index) {
			console.log("123")
			console.log(data)
			console.log(new Date(Date.parse(data) ))
			if (Check1 == true)
				reserve_times.push(new Date(data + " 06:00"))
		})
		console.log(reserve_times)
		console.log(reserveDates)
		console.log(option1)
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

		try{
		postReserves(
			new Date(openDate + openTime),
			place_id,
			person,
			reserveDates,
			option1,
		).then(function(data) {
			if (data.status === 200){
				alert("예약 등록이 완료되었습니다")
				return true;
			}
			else {
				alert("예약 등록을 실패하였습니다. 관리자에게 문의하세요")
			}
		});
		}catch (e) {

		}
		event.preventDefault(); //delete
		return false;
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
		if(Check1 === true && Check2 === true && Check3 === true && Check4 === true && Check5 === true && Check6 === true && Check7 === true && Check7 === true && Check8 === true){
		  setAllCheck(true)
		} else {
		  setAllCheck(false)
		}
	  }, [Check1,Check2,Check3,Check4,Check5,Check6,Check7,Check8])

	return(
		(loading)?<div>Loading...</div>:
		<div className='Container'>
			<form className='Form'>
				<fieldset>
					<legend>새 예약 입력 form</legend>
					<div className='Row'>
						<div className='Title'>
							<div className='TitleTag FormRowTitle'>
								프로그램 시작 시각
							</div>
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
							<div className='TitleTag FormRowTitle'>
								시설
							</div>
						</div>
						<div className='Input'>
							<select id="facility" name="facility" className='Select' required  onChange={onChangeFacility}>
								{facility.map((data, index) => (
									<option key={index} value={data}>{data}</option>
								))}
							</select>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<div className='TitleTag FormRowTitle'>
								시설상세1
							</div>
						</div>
						<div className='Input'>
							<select id="facility-detail1" name="facility-detail1" className='Select' required onChange={onChangeFacilityDetail1}>
								{facility_detail1.map((data, index) => (
									<option key={index} value={data}>{data}</option>
								))}
							</select>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<div className='TitleTag FormRowTitle'>
								시설상세2
							</div>
						</div>
						<div className='Input'>
							<select id="facility-detail2" name="facility-detail2" className='Select' required >
								{facility_detail2.map((data, index) => (
									<option key={index} value={data.toString()}>{data}</option>
								))}
							</select>
						</div>
					</div>
					<div className='Row'>
						<div className='Title'>
							<div className='TitleTag FormRowTitle'>
								인원 수
							</div>
						</div>
						<div className='Input'>
							<input type="number" className='InputTag' onChange={(e) =>{setPerson(e.target.value)}} required>
							</input>
						</div>
					</div>
					<div id='BookDate'>
						<div >
							<div className='TitleTag FormRowTitle'>
								예약할 날짜 설정
							</div>
						</div>
						<div>
							{reserveDates.map((date, index) => (
								<div id="InputDate">
									<input key={index} type="date" className='InputTag' onChange={(e) => onClickReserveDate(e, index)} min={min} required disabled={!isStartDateChecked}>
									</input>
								</div>
							))}
						</div>
						<div>
							<button onClick={addDate}>
								추가
							</button>
							<span >  </span>
							<button onClick={deleteDate}>
								삭제
							</button>
						</div>
					</div>

					<div id='BookTime'>
						<div className='TitleTag FormRowTitle'>
							회차옵션
						</div>
						<div className="Error">위 선택한 모든 날짜에 옵션이 적용됩니다.</div>
						<div className='TableDiv'>
							<table border="1">
								<tbody>
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
								</tbody>
							</table>
							<input type="checkbox" id='all' name='all' checked={allCheck} onChange={allBtnEvent}></input>전체선택
						</div>

					</div>

					<div className='Row'>
						<div className='Title'>
							<div className='TitleTag FormRowTitle'>
								부가옵션
							</div>
						</div>
						<div className='Input' >
							<div id='OptionDiv'>
								<input type="checkbox" id='option1' name='option1' value={option1} onClick={onClickOption1}/>조명
							</div>
						</div>
					</div>
					<Link to="/" >
						<button type="button" onClick={onSubmit}>예약</button>
					</Link>


				</fieldset>
			</form>

		</div>
	);
}

export default Reservation;
