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
	  <div id="Logo" className="text fs-2 fw-bold mb-5">☆환 서완우 전무님 영☆</div>
	  <div id="Test" className="mt-5">
		<form onSubmit={onSubmit}>
		  <div>
			<input
			  type="text"
			  id="InputCode"
			  className="form-control w-xs-auto mb-2"
			  placeholder="코드를 입력하세요"
			  value={text}
			  onChange={onChangeText}
			/>
		  </div>
		  <div id="WrongCode" className="text-danger" hidden={isValid}>
			코드가 정확하지 않습니다.
		  </div>
		  <div>
			<a type="button" className="btn btn-primary" onClick={onSubmit}>로그인</a>
		  </div>
		</form>
	</div>
	</div>
);
}

export default Login;
