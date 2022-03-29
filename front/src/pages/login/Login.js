import {useState} from "react";
import './Login.css'
import * as api from "../../api/api";
import {useNavigate} from 'react-router-dom'

function Login(props) {
  const [text, setText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isValid, setIsValid] = useState(true);


  const navigate = useNavigate();

  const onChangeText = (object) => {
    setText(object.target.value);
  }

  const onSubmit = async (e) => {
    console.log("onSubmit enter")
    e.preventDefault();
    if (text.length <= 0)
      return false;
    try {
      const data = await api.login(text);
      if (data === 200)
        navigate('/')
    } catch (err) {
      if (err.response.status === 401) {
        setIsValid(false);
      }
    }
    return false
  }


  return (
    <div id="Container">
      <div id="Logo">
        ☆환 서완우 전무님 영☆
      </div>
      <div id="Test">
        <form >
          <div>
            <input type="text" id="InputCode" placeholder="코드를 입력하세요"
                   value={text} onChange={onChangeText}/>
          </div>
          <div id="WrongCode" hidden={!isValid}>{errorText}</div>
          <div>
            <input type="button" id="LoginButton" value="입장" onClick={onSubmit}/>
          </div>
        </form>
      </div>
    </div>);
}

export default Login;
