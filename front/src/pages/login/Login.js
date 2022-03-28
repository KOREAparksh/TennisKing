import {useState} from "react";
import './Login.css'

function Login()
{

	const [text, setText] = useState("");

	const onChangeText = (object) =>{
		setText(object.target.value);
	}

	const onTapButton = () => {
		alert(text);
		return false;
	}


	return (
	<div id="Container">
		<div id="Logo">
			너 누구냐?
		</div>
		<div id="Test">
			<form>
				<div>
					<input type="text" id="InputCode" placeholder="코드를 입력하세요"
									value={text} onChange={onChangeText}/>
					</div>
				<div><button type="submit" onClick={onTapButton} >입장</button></div>
			</form>
		</div>
	</div>);
}

export default Login;
