import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Janus.js를 public 폴더에서 불러오기
const Janus = window.Janus;

function Videoroomtest() {
    const [server] = useState("https://janus.jsflux.co.kr/janus"); // Janus 서버 주소
    const [janus, setJanus] = useState(null);
    const [pluginHandle, setPluginHandle] = useState(null);
    const [showCameraMenu, setShowCameraMenu] = useState(false); // 카메라 활성화 메뉴 상태
    const [isJoined, setIsJoined] = useState(false); // 회의실 입장 여부
    const [username, setUsername] = useState(""); // 사용자 이름
    const [usernameInput, setUsernameInput] = useState(""); // 사용자 이름 입력값
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null); // 카메라 스트림 상태

    // Janus 초기화
    useEffect(() => {
        if (!Janus.isWebrtcSupported()) {
            alert("WebRTC not supported by your browser!");
            return;
        }

        Janus.init({
            debug: "all",
        });
    }, []);

    const openCameraMenu = () => {
        if (usernameInput.trim() === "") {
            alert("Please enter a username.");
            return;
        }
        setUsername(usernameInput); // 사용자 이름 설정
        setShowCameraMenu(true);
    };

    const activateCamera = async () => {
        try {
            // 카메라 및 마이크 권한 요청
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            setLocalStream(stream); // 로컬 스트림 상태 설정
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream; // 비디오 요소에 스트림 연결
            }
            console.log("Camera activated successfully!");
        } catch (error) {
            console.error("Failed to access camera:", error);
            alert("카메라 접근에 실패했습니다. 브라우저 설정을 확인해주세요.");
        }
    };

    const startJanus = () => {
        // Janus Gateway 시작
        const janusInstance = new Janus({
            server,
            success: () => {
                console.log("Janus Gateway connected!");
                attachPlugin(janusInstance);
            },
            error: (error) => {
                console.error("Janus connection error:", error);
            },
            destroyed: () => {
                console.log("Janus Gateway destroyed");
            },
        });
        setJanus(janusInstance);
        setShowCameraMenu(false); // 메뉴 닫기
    };

    const attachPlugin = (janusInstance) => {
        // videoroom 플러그인 연결
        janusInstance.attach({
            plugin: "janus.plugin.videoroom",
            success: (handle) => {
                console.log("videoroom plugin attached!");
                setPluginHandle(handle);
                joinRoom(handle);
            },
            error: (error) => {
                console.error("Failed to attach plugin:", error);
            },
            onlocalstream: (stream) => {
                console.log("Local stream received:", stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            },
            onremotestream: (stream) => {
                console.log("Remote stream received:", stream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream;
                } else {
                    console.warn("Remote video element not found!");
                }
            },
        });
    };

    const joinRoom = (handle) => {
        const roomId = 1234; // 테스트용 방 ID

        // 방 입장 요청
        const joinRequest = {
            request: "join",
            room: roomId,
            ptype: "publisher",
            display: username, // 사용자 이름 전송
        };

        handle.send({
            message: joinRequest,
            success: () => {
                console.log("Joined room successfully!");
                // 참가자 리스트 가져오기
                handle.send({
                    message: { request: "listparticipants", room: roomId },
                    success: (response) => {
                        console.log("Participants:", response.participants);
                        // 상대방 구독
                        response.participants.forEach((participant) => {
                            if (participant.id !== handle.getId()) {
                                subscribeToRemote(handle, participant.id);
                            }
                        });
                    },
                });
            },
        });
        setIsJoined(true);
    };

    const subscribeToRemote = (handle, participantId) => {
        const subscribeRequest = {
            request: "join",
            room: 1234,
            ptype: "subscriber",
            feed: participantId,
        };

        handle.send({
            message: subscribeRequest,
            success: () => {
                console.log("Subscribed to participant:", participantId);
            },
            error: (error) => {
                console.error("Failed to subscribe:", error);
            },
        });
    };

    return (
        <div className="container mt-5">
            {/* 사용자 이름 입력 및 회의실 입장 버튼 */}
            {!isJoined && !showCameraMenu && (
                <div className="text-center mt-3">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={openCameraMenu}>
                        회의실 입장
                    </button>
                </div>
            )}

            {/* 카메라 활성화 메뉴 */}
            {showCameraMenu && (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">카메라 활성화</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowCameraMenu(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>카메라를 활성화하고 회의실에 입장하시겠습니까?</p>
                                <button
                                    className="btn btn-success mr-2"
                                    onClick={activateCamera}
                                >
                                    카메라 활성화
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={startJanus}
                                >
                                    확인 및 입장
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowCameraMenu(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 비디오 화면 */}
            {localStream && (
                <div className="row mt-4">
                    <div className="col-md-6">
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            className="w-100 border"
                        />
                    </div>
                    {isJoined && (
                        <div className="col-md-6">
                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                className="w-100 border"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Videoroomtest;
