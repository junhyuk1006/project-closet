import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Janus = window.Janus;

function Videoroomtest() {
    const [server] = useState("https://janus.jsflux.co.kr/janus");
    const [janus, setJanus] = useState(null);
    const [pluginHandle, setPluginHandle] = useState(null);
    const [showCameraMenu, setShowCameraMenu] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const localVideoRef = useRef(null);
    const remoteVideoRefs = useRef({});
    const [localStream, setLocalStream] = useState(null);

    useEffect(() => {
        if (!Janus.isWebrtcSupported()) {
            alert("WebRTC를 지원하지 않는 브라우저입니다.");
            return;
        }
        Janus.init({ debug: "all" });
    }, []);

    useEffect(() => {
        return () => {
            if (janus) {
                janus.destroy(); // 세션 종료
                console.log("Janus 세션 정리 완료");
            }
        };
    }, [janus]);

    const openCameraMenu = () => {
        if (usernameInput.trim() === "") {
            alert("사용자 이름을 입력해주세요.");
            return;
        }
        setUsername(usernameInput);
        setShowCameraMenu(true);
    };

    const activateCamera = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("브라우저가 WebRTC를 지원하지 않습니다. 최신 브라우저를 사용해주세요.");
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            console.log("카메라 활성화 성공!");
        } catch (error) {
            console.error("카메라 접근 실패:", error);
            if (error.name === "NotAllowedError") {
                alert("카메라와 마이크 사용 권한이 필요합니다.");
            } else if (error.name === "NotFoundError") {
                alert("카메라 또는 마이크가 연결되어 있지 않습니다.");
            } else {
                alert(`알 수 없는 오류 발생: ${error.message}`);
            }
        }
    };

    const startJanus = () => {
        if (janus) {
            janus.destroy(); // 기존 세션이 존재할 경우 종료
        }

        const janusInstance = new Janus({
            server,
            success: () => {
                console.log("Janus Gateway 연결 성공!");
                attachPlugin(janusInstance);
            },
            error: (error) => {
                console.error("Janus 연결 실패:", error);
            },
            destroyed: () => {
                console.log("Janus Gateway 종료");
            },
        });
        setJanus(janusInstance);
        setShowCameraMenu(false);
    };

    const attachPlugin = (janusInstance) => {
        janusInstance.attach({
            plugin: "janus.plugin.videoroom",
            success: (handle) => {
                console.log("videoroom 플러그인 연결 성공!");
                setPluginHandle(handle);
                joinRoom(handle);
            },
            error: (error) => {
                console.error("플러그인 연결 실패:", error);
            },
            onlocalstream: (stream) => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            },
            onremotestream: (stream) => {
                if (!remoteVideoRefs.current[stream.id]) {
                    const videoElement = document.createElement("video");
                    videoElement.autoplay = true;
                    videoElement.playsInline = true;
                    videoElement.srcObject = stream;
                    document.getElementById("remote-videos").appendChild(videoElement);
                    remoteVideoRefs.current[stream.id] = videoElement;
                }
            },
            onmessage: (msg, jsep) => {
                const event = msg.videoroom;
                if (event === "joined") {
                    if (msg.publishers) {
                        msg.publishers.forEach((publisher) => {
                            subscribeToRemote(pluginHandle, publisher.id);
                        });
                    }
                } else if (event === "event") {
                    if (msg.publishers) {
                        msg.publishers.forEach((publisher) => {
                            subscribeToRemote(pluginHandle, publisher.id);
                        });
                    } else if (msg.leaving || msg.unpublished) {
                        cleanupRemoteFeed(msg.leaving || msg.unpublished);
                    }
                }
                if (jsep) {
                    pluginHandle.handleRemoteJsep({ jsep });
                }
            },
        });
    };

    const joinRoom = (handle) => {
        const roomId = 1234;

        const joinRequest = {
            request: "join",
            room: roomId,
            ptype: "publisher",
            display: username,
        };

        handle.send({
            message: joinRequest,
            success: () => {
                console.log("방 입장 성공!");
                handle.send({
                    message: { request: "listparticipants", room: roomId },
                    success: (response) => {
                        console.log("참여자 리스트:", response.participants);
                        response.participants.forEach((participant) => {
                            if (participant.id !== handle.getId()) {
                                subscribeToRemote(handle, participant.id);
                            }
                        });
                    },
                });
            },
            error: (error) => {
                if (error.error_code === 425) {
                    console.error("이미 퍼블리셔로 참여 중입니다. 새로운 세션을 생성합니다.");
                    janus.destroy(); // 기존 세션 종료
                    startJanus(); // 새로운 세션 시작
                } else {
                    console.error("방 입장 실패:", error);
                }
            },
        });
        setIsJoined(true);
    };

    const subscribeToRemote = (handle, participantId) => {
        handle.send({
            message: { request: "join", room: 1234, ptype: "subscriber", feed: participantId },
        });
    };

    const cleanupRemoteFeed = (feedId) => {
        if (remoteVideoRefs.current[feedId]) {
            remoteVideoRefs.current[feedId].remove();
            delete remoteVideoRefs.current[feedId];
        }
    };

    return (
        <div className="container mt-5">
            {!isJoined && !showCameraMenu && (
                <div className="text-center mt-3">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="사용자 이름 입력"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={openCameraMenu}>
                        회의실 입장
                    </button>
                </div>
            )}
            {showCameraMenu && (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">카메라 활성화</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowCameraMenu(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>카메라를 활성화하려면 아래 버튼을 클릭하세요.</p>
                                <button
                                    className="btn btn-success"
                                    onClick={activateCamera}
                                >
                                    카메라 활성화
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={startJanus}>
                                    회의실 입장
                                </button>
                                <button
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
            <div id="remote-videos" className="row mt-4">
                {localStream && (
                    <div className="col-md-6">
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            className="w-100 border"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Videoroomtest;