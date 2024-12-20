import React, { useEffect, useState, useRef } from "react";

const RemoteFeedComponent = ({ janusInstance, roomId, opaqueId, feedId, privateId, videoCodec }) => {
    const [remoteFeed, setRemoteFeed] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        // Attach the plugin when the component is mounted
        if (janusInstance) {
            attachRemoteFeed();
        }

        // Cleanup when the component is unmounted
        return () => {
            if (remoteFeed) {
                remoteFeed.detach();
            }
        };
    }, [janusInstance]);

    const attachRemoteFeed = () => {
        janusInstance.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId,
            success: (pluginHandle) => {
                setRemoteFeed(pluginHandle);
                pluginHandle.simulcastStarted = false;
                console.log(`플러그인 첨부 완료! (${pluginHandle.getPlugin()}, id=${pluginHandle.getId()})`);
                console.log("  -- 이 사용자는 구독자입니다.");

                // 구독 요청 메시지 작성
                const subscribeMessage = {
                    request: "join",
                    room: roomId,
                    ptype: "subscriber",
                    feed: feedId,
                    private_id: privateId,
                };

                // 특정 코덱이 지원되지 않는 경우 비디오 수신 비활성화
                if (
                    Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                    (videoCodec === "vp9" || (videoCodec === "vp8" && !Janus.safariVp8))
                ) {
                    console.warn(
                        `게시자가 ${videoCodec.toUpperCase()}을 사용 중이나 Safari는 이를 지원하지 않습니다: 비디오 비활성화`
                    );
                    subscribeMessage.offer_video = false;
                }

                pluginHandle.videoCodec = videoCodec;
                pluginHandle.send({
                    message: subscribeMessage,
                });
            },
            error: (error) => {
                console.error("플러그인 첨부 중 오류 발생:", error);
                alert(`플러그인 첨부 중 오류 발생: ${error}`);
            },
            onmessage: (msg, jsep) => {
                console.log("Received message:", msg);
                if (jsep) {
                    remoteFeed.handleRemoteJsep({ jsep });
                }
            },
            onremotestream: (stream) => {
                console.log("원격 스트림을 수신했습니다:", stream);
                setVideoStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            },
            oncleanup: () => {
                console.log("원격 스트림이 정리되었습니다.");
                setVideoStream(null);
            },
        });
    };

    return (
        <div className="remote-feed-container">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                controls={false}
                className="remote-video"
            />
        </div>
    );
};

export default RemoteFeedComponent;