import React, { useState } from "react";
import { useJanus } from "./JanusContext";

function RegisterUsername() {
    const [roomName, setRoomName] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { registerRoomAndUsername } = useJanus();

    const validateInput = () => {
        if (roomName === "") {
            setErrorMessage("채팅방 아이디(번호)를 넣으세요. ex) 1234");
            return false;
        }
        if (/[^0-9]/.test(roomName)) {
            setErrorMessage("채팅방 아이디는 숫자만 가능합니다.");
            setRoomName("");
            return false;
        }
        if (username === "") {
            setErrorMessage("채팅방에서 사용할 닉네임을 입력해주세요.");
            return false;
        }
        if (/[^a-zA-Z0-9]/.test(username)) {
            setErrorMessage("닉네임은 영문과 숫자만 가능합니다.");
            setUsername("");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleRegister = () => {
        if (!validateInput()) return;
        registerRoomAndUsername(roomName, username);
    };

    return (
        <div>
            <h2>Register Username</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div>
                <label>채팅방 아이디:</label>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Room ID (숫자만)"
                />
            </div>
            <div>
                <label>닉네임:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nickname (영문과 숫자만)"
                />
            </div>
            <button onClick={handleRegister}>등록</button>
        </div>
    );
}

export default RegisterUsername;