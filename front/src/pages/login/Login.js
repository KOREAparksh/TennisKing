import {useState} from "react";
import './Login.css'
import * as api from "../../api/api";
import {useNavigate} from 'react-router-dom'

function Login(props) {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const onChangeText = (object) => {
    setText(object.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login(text);
      navigate('/');
    } catch (err) {
      if (err.response.status === 401) {
        setIsValid(false);
      }
    }
  }


  return (
    <div id="Container">
      <div id="Logo">
        ☆환 서완우 전무님 영☆
      </div>
      <div id="Test">
        <form onSubmit={onSubmit}>
          <div>
            <input type="text" id="InputCode" placeholder="코드를 입력하세요"
                   value={text} onChange={onChangeText}/>
          </div>
          <div id="WrongCode" hidden={isValid}>코드가 올바르지 않습니다.</div>
          <div>
            <input type="button" id="LoginButton" value="입장"/>
          </div>
        </form>
      </div>
    </div>);
}

export default Login;
