import React, { useEffect } from "react";
import Janus from "janus-gateway"; // Janus 라이브러리 가져오기
import { useJanus } from "./JanusContext";

const StartButtonComponent = () => {
    const { server, opaqueId, setJanus, setSfutest } = useJanus();

    useEffect(() => {
        if (!Janus) {
            console.error("Janus library is not loaded correctly.");
            return;
        }

        Janus.init({
            debug: "all",
            callback: () => console.log("Janus initialized"),
        });
    }, []);

    const handleStartClick = () => {
        if (!Janus.isWebrtcSupported()) {
            alert("WebRTC를 지원하지 않는 브라우저입니다.");
            return;
        }

        const janus = new Janus({
            server,
            success: () => {
                janus.attach({
                    plugin: "janus.plugin.videoroom",
                    opaqueId,
                    success: (pluginHandle) => {
                        console.log("VideoRoom plugin attached!");
                        setSfutest(pluginHandle);
                    },
                });
            },
            error: (err) => {
                console.error("Janus error:", err);
                alert(`Error: ${err}`);
            },
        });

        setJanus(janus);
    };

    return (
        <button className="btn btn-primary" onClick={handleStartClick}>
            시작
        </button>
    );
};

export default StartButtonComponent;