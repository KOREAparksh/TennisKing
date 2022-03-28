import {useState} from "react";
import './Login.css'

function Login() {

  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onChangeText = (object) => {
    setText(object.target.value);
  }

  const onTapButton = () => {
    alert(text);
    setIsValid(false)
    return false;
  }


  return (
    <div id="Container">
      <div id="Logo">
        ☆환 서완우 전무님 영☆
      </div>
      <div id="Test">
        <form>
          <div>
            <input type="text" id="InputCode" placeholder="코드를 입력하세요"
                   value={text} onChange={onChangeText}/>
          </div>
          <div id="WrongCode" hidden={isValid}>코드가 올바르지 않습니다.</div>
          <div>
            <input type="button" id="LoginButton" value="입장"
                   onSubmit="return false;" onClick={onTapButton}/>
          </div>
        </form>
      </div>
    </div>);
}

export default Login;
