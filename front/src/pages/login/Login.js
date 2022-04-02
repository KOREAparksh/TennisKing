import { useState } from "react";
import "./Login.css";
import * as api from "../../api/api";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const onChangeText = (object) => {
	setText(object.target.value);
  };

  const onSubmit = async (e) => {
	e.preventDefault();
	if (text.length <= 0) return false;
	try {
	  await api.login(text);
	  navigate("/");
	} catch (err) {
	  if (err.response.data.message === "Invalid Code") {
		setIsValid(false);
	  }
	}
	return false;
  };

  return (
	<div id="Container">
	  <div id="Logo">☆환 서완우 전무님 영☆</div>
	  <div id="Test">
		<form onSubmit={onSubmit}>
		  <div>
			<input
			  type="text"
			  id="InputCode"
			  placeholder="코드를 입력하세요"
			  value={text}
			  onChange={onChangeText}
			/>
		</div>
		<div id="WrongCode" hidden={isValid}>
			코드가 정확하지 않습니다.
		  </div>
		  <div>
			<button type="button" className="btn btn-default" onClick={onSubmit}>로그인</button>
		</div>
		</form>
	</div>
	</div>
);
}

export default Login;
