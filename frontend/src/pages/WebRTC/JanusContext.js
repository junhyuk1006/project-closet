import React, { createContext, useContext, useState, useEffect } from "react";
import Janus from 'janus-gateway';

console.log("확인",Janus);  // Janus가 정상적으로 로드되었는지 확인


const JanusContext = createContext();

export const JanusProvider = ({ children }) => {
    const [server] = useState("https://janus.jsflux.co.kr/janus");
    const [janus, setJanus] = useState(null);
    const [sfutest, setSfutest] = useState(null);
    const [opaqueId] = useState(`videoroomtest-${Math.random().toString(36).substring(2, 15)}`);
    const [myroom, setMyroom] = useState(null);
    const [username, setUsername] = useState(null);
    const [mystream, setMystream] = useState(null);
    const [doSimulcast] = useState(false);
    const [doSimulcast2] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // 추가: feeds 상태와 setFeeds 함수 초기화
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        // Janus.init 호출 및 초기화 완료 후 initializeJanus 호출
        if (!isInitialized) {
            Janus.init({
                debug: "all",
                callback: () => {
                    console.log("Janus initialized");
                    initializeJanus(); // Janus가 초기화되면 이 함수 호출
                },
            });
        }
    }, [isInitialized]);

    const initializeJanus = () => {
        // WebRTC 지원 여부 확인
        if (!Janus.isWebrtcSupported()) {
            alert("WebRTC를 지원하지 않는 브라우저입니다.");
            return;
        }

        // Janus 인스턴스 생성
        const janusInstance = new Janus({
            server,
            success: () => {
                janusInstance.attach({
                    plugin: "janus.plugin.videoroom",
                    opaqueId,
                    success: (handle) => {
                        setSfutest(handle);

                        const joinRequest = {
                            request: "join",
                            room: myroom || 1234, // 기본 방 ID
                            ptype: "publisher",
                            display: username || "Guest",
                        };
                        handle.send({ message: joinRequest });
                    },
                    onmessage: (msg, jsep) => {
                        if (jsep) {
                            sfutest.createAnswer({
                                jsep,
                                media: { audioSend: true, videoSend: true },
                                success: (jsepAnswer) => {
                                    sfutest.send({
                                        message: { request: "configure", audio: true, video: true },
                                        jsep: jsepAnswer,
                                    });
                                },
                            });
                        }
                    },
                    onlocalstream: (stream) => setMystream(stream),
                });
            },
            error: (err) => alert("Janus 오류: " + err),
        });

        setJanus(janusInstance);
        setIsInitialized(true); // 초기화 완료 표시
    };

    const registerRoomAndUsername = (roomName, user) => {
        if (!sfutest) return;

        const createRoomMessage = {
            request: "create",
            room: Number(roomName),
            permanent: false,
            record: false,
            publishers: 6,
            bitrate: 128000,
            fir_freq: 10,
            description: "test",
            is_private: false,
        };

        sfutest.send({
            message: createRoomMessage,
            success: (result) => {
                if (result["videoroom"] === "created") {
                    const joinRequest = {
                        request: "join",
                        room: Number(roomName),
                        ptype: "publisher",
                        display: user,
                    };
                    sfutest.send({
                        message: joinRequest,
                        success: () => {
                            setMyroom(roomName);
                            setUsername(user);
                            console.log("Room created and joined:", roomName);
                        },
                    });
                }
            },
        });
    };

    const publishOwnFeed = (useAudio = true) => {
        if (!sfutest) return;

        setIsPublishing(true);

        sfutest.createOffer({
            media: {
                audioRecv: false,
                videoRecv: false,
                audioSend: useAudio,
                videoSend: true,
                video: "hires",
            },
            simulcast: doSimulcast,
            simulcast2: doSimulcast2,

            success: (jsep) => {
                const publish = { request: "configure", audio: useAudio, video: true };
                sfutest.send({ message: publish, jsep });
                setIsPublishing(false);
            },

            error: (error) => {
                console.error("WebRTC Error:", error);

                if (useAudio) {
                    publishOwnFeed(false); // Retry without audio
                } else {
                    alert("WebRTC Error: " + error.message);
                    setIsPublishing(false);
                }
            },
        });
    };

    const attachNewRemoteFeed = (id, display, audio, video, privateId) => {
        if (!janus) return;

        janus.attach({
            plugin: "janus.plugin.videoroom",
            success: (handle) => {
                const feed = {
                    id,
                    display,
                    audio,
                    video,
                    handle,
                };
                setFeeds((prev) => [...prev, feed]);

                const subscribeRequest = {
                    request: "join",
                    room: myroom,
                    ptype: "subscriber",
                    feed: id,
                    private_id: privateId,
                };

                if (
                    Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                    (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
                ) {
                    subscribeRequest.offer_video = false;
                }

                handle.send({ message: subscribeRequest });
            },
            error: (error) => {
                console.error("Failed to attach remote feed:", error);
            },
            onmessage: (msg, jsep) => {
                const event = msg.videoroom;

                if (jsep) {
                    feeds.find((feed) => feed.id === id).handle.createAnswer({
                        jsep,
                        media: { audioSend: false, videoSend: false },
                        success: (jsepResponse) => {
                            feeds.find((feed) => feed.id === id).handle.send({
                                message: { request: "start" },
                                jsep: jsepResponse,
                            });
                        },
                        error: (error) => {
                            console.error("Failed to create WebRTC answer:", error);
                        },
                    });
                }
            },
            onremotestream: (stream) => {
                setFeeds((prev) =>
                    prev.map((feed) =>
                        feed.id === id ? { ...feed, stream } : feed
                    )
                );
            },
            oncleanup: () => {
                setFeeds((prev) => prev.filter((feed) => feed.id !== id));
            },
        });
    };

    return (
        <JanusContext.Provider
            value={{
                server,
                janus,
                sfutest,
                opaqueId,
                myroom,
                setMyroom,
                username,
                mystream,
                isPublishing,
                isInitialized,
                initializeJanus,
                registerRoomAndUsername,
                attachNewRemoteFeed,
                publishOwnFeed,
                doSimulcast,
                doSimulcast2,
                feeds, // feeds 상태 추가
                setFeeds, // setFeeds 함수 추가
            }}
        >
            {children}
        </JanusContext.Provider>
    );
};

export const useJanus = () => useContext(JanusContext);