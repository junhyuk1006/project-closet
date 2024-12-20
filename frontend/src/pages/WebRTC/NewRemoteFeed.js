import React, { useState, useRef, useEffect } from "react";

const NewRemoteFeed = ({ janusInstance, roomId, opaqueId, myPrivateId }) => {
    const [remoteFeeds, setRemoteFeeds] = useState({});

    const attachNewRemoteFeed = (id, display, audio, video) => {
        janusInstance.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId,
            success: (pluginHandle) => {
                console.log(`플러그인 첨부 완료! (${pluginHandle.getPlugin()}, id=${pluginHandle.getId()})`);
                console.log("-- 이 사용자는 구독자입니다.");

                const remoteFeed = {
                    handle: pluginHandle,
                    videoCodec: video,
                };

                // 상태 업데이트
                setRemoteFeeds((prev) => ({ ...prev, [id]: remoteFeed }));

                // 구독 요청 메시지 작성
                const subscribeRequest = {
                    request: "join",
                    room: roomId,
                    ptype: "subscriber",
                    feed: id,
                    private_id: myPrivateId,
                };

                // 특정 코덱이 지원되지 않는 경우 비디오 수신 비활성화
                if (
                    Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                    (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
                ) {
                    console.warn(`Safari does not support ${video}. Video disabled.`);
                    subscribeRequest.offer_video = false;
                }

                pluginHandle.videoCodec = video;

                pluginHandle.send({
                    message: subscribeRequest,
                });
            },
            error: (error) => {
                console.error("플러그인 첨부 중 오류 발생:", error);
                alert("플러그인 첨부 중 오류 발생: " + error);
            },
            onmessage: (msg, jsep) => {
                console.log("Received message from remote feed:", msg);

                if (jsep) {
                    console.log("Handling JSEP:", jsep);
                    remoteFeeds[id].handle.createAnswer({
                        jsep,
                        media: { audioSend: false, videoSend: false },
                        success: (jsepResponse) => {
                            remoteFeeds[id].handle.send({ message: { request: "start" }, jsep: jsepResponse });
                        },
                        error: (error) => {
                            console.error("WebRTC Answer 생성 중 오류:", error);
                        },
                    });
                }
            },
            onremotestream: (stream) => {
                console.log("원격 스트림 수신:", stream);

                const videoElement = document.createElement("video");
                videoElement.autoplay = true;
                videoElement.playsInline = true;
                videoElement.srcObject = stream;

                // DOM에 추가
                document.getElementById("remote-videos").appendChild(videoElement);
            },
            oncleanup: () => {
                console.log(`Remote feed cleanup for feed ${id}`);

                // 상태에서 제거
                setRemoteFeeds((prev) => {
                    const updatedFeeds = { ...prev };
                    delete updatedFeeds[id];
                    return updatedFeeds;
                });
            },
        });
    };

    return { attachNewRemoteFeed };
};

export default NewRemoteFeed;
