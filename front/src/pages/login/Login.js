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
            await api.login(text).then(function (response) {
                if (response.status === 200) navigate("/");
                else if (response.status === 401) {
                    setIsValid(false);
                } else if (response.status === 400) {
                }
            });
        } catch (err) {
            alert("오류가 발생했습니다. 관리자에게 문의하세요");
        }
        return false;
    };

    return (
        <div id="Container">
            <div id="Logo" className="text fs-2 fw-bold mb-5">
                ☆ Dasan TennisKing ☆
            </div>
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
                        <a type="button" className="btn btn-primary" onClick={onSubmit}>
                            로그인
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
