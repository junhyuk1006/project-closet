import React, { useEffect, useRef, useState } from "react";

const RemoteStreamHandler = ({ remoteFeed, remoteFeedIndex }) => {
    const videoRef = useRef(null);
    const waitingVideoRef = useRef(null);
    const [resolution, setResolution] = useState(null);
    const [bitrate, setBitrate] = useState(null);
    const [noVideo, setNoVideo] = useState(false);

    useEffect(() => {
        if (!remoteFeed || !remoteFeedIndex) return;

        // 원격 스트림 처리
        remoteFeed.onremotestream = (stream) => {
            console.log(`원격 피드 #${remoteFeedIndex}, 스트림:`, stream);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setNoVideo(false);

                // 비디오 이벤트 핸들러
                videoRef.current.onplaying = () => {
                    if (remoteFeed.spinner) {
                        remoteFeed.spinner.stop();
                        remoteFeed.spinner = null;
                    }

                    // 해상도 확인
                    const width = videoRef.current.videoWidth;
                    const height = videoRef.current.videoHeight;
                    if (width && height) {
                        setResolution(`${width}x${height}`);
                    }

                    // Firefox의 경우 지연 문제 해결
                    if (Janus.webRTCAdapter.browserDetails.browser === "firefox") {
                        setTimeout(() => {
                            const width = videoRef.current.videoWidth;
                            const height = videoRef.current.videoHeight;
                            if (width && height) {
                                setResolution(`${width}x${height}`);
                            }
                        }, 2000);
                    }
                };
            } else {
                // 원격 비디오 없음
                setNoVideo(true);
            }

            // 비트레이트 업데이트 타이머 설정
            if (["chrome", "firefox", "safari"].includes(Janus.webRTCAdapter.browserDetails.browser)) {
                const bitrateTimer = setInterval(() => {
                    const bitrateValue = remoteFeed.getBitrate();
                    setBitrate(bitrateValue);

                    // 해상도 업데이트
                    if (videoRef.current) {
                        const width = videoRef.current.videoWidth;
                        const height = videoRef.current.videoHeight;
                        if (width && height) {
                            setResolution(`${width}x${height}`);
                        }
                    }
                }, 1000);

                return () => clearInterval(bitrateTimer);
            }
        };
    }, [remoteFeed, remoteFeedIndex]);

    return (
        <div id={`videoremote${remoteFeedIndex}`} className="remote-video-container">
            {noVideo ? (
                <div className="no-video-container">
                    <i className="fa fa-video-camera fa-5 no-video-icon"></i>
                    <span className="no-video-text">원격 비디오가 없습니다</span>
                </div>
            ) : (
                <>
                    <video
                        ref={waitingVideoRef}
                        className="rounded centered"
                        id={`waitingvideo${remoteFeedIndex}`}
                        width="100%"
                        height="100%"
                        autoPlay
                        playsInline
                    />
                    <video
                        ref={videoRef}
                        className="rounded centered relative"
                        id={`remotevideo${remoteFeedIndex}`}
                        width="100%"
                        height="100%"
                        autoPlay
                        playsInline
                    />
                    {resolution && (
                        <span
                            className="label label-primary"
                            id={`curres${remoteFeedIndex}`}
                            style={{ position: "absolute", bottom: "0px", left: "0px", margin: "15px" }}
                        >
                            {resolution}
                        </span>
                    )}
                    {bitrate && (
                        <span
                            className="label label-info"
                            id={`curbitrate${remoteFeedIndex}`}
                            style={{ position: "absolute", bottom: "0px", right: "0px", margin: "15px" }}
                        >
                            {bitrate}
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default RemoteStreamHandler;