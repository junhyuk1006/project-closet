import React, { useState, useEffect, useRef } from "react";
import { useJanus } from "./JanusContext";

const LocalStreamComponent = () => {
    const { mystream, sfutest, publishOwnFeed } = useJanus();
    const [isMuted, setIsMuted] = useState(true);
    const [isPublished, setIsPublished] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        if (mystream && videoRef.current) {
            // Stream을 video 요소에 연결
            videoRef.current.srcObject = mystream;
        }
    }, [mystream]);

    const toggleMute = () => {
        if (!sfutest) return;

        const audioTracks = mystream.getAudioTracks();
        if (audioTracks && audioTracks.length > 0) {
            audioTracks[0].enabled = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const unpublishOwnFeed = () => {
        if (!sfutest) return;

        sfutest.send({
            message: { request: "unpublish" },
        });
        setIsPublished(false);
    };

    return (
        <div id="videolocal" style={{ position: "relative" }}>
            <video
                ref={videoRef}
                className="rounded centered"
                style={{ width: "100%", height: "100%" }}
                autoPlay
                playsInline
                muted
            />
            {/* Mute 버튼 */}
            <button
                className="btn btn-warning btn-xs"
                style={{ position: "absolute", bottom: "15px", left: "15px" }}
                onClick={toggleMute}
            >
                {isMuted ? "Unmute" : "Mute"}
            </button>
            {/* Unpublish 버튼 */}
            <button
                className="btn btn-warning btn-xs"
                style={{ position: "absolute", bottom: "15px", right: "15px" }}
                onClick={unpublishOwnFeed}
                disabled={!isPublished}
            >
                Unpublish
            </button>
        </div>
    );
};

export default LocalStreamComponent;