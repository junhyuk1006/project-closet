import React from "react";
import { useJanus } from "./JanusContext";

const VideoroomComponent = () => {
    const {
        server,
        myroom,
        mystream,
        devices,
        isInitialized,
        initializeJanus,
    } = useJanus();

    const restartCapture = () => {
        console.log("Restarting capture with selected devices...");
        // 장치 설정 변경 로직 추가
    };

    return (
        <div className="container mt-5">
            <h2>Janus Videoroom</h2>
            <p>Server: {server}</p>
            <p>Room: {myroom}</p>

            <button
                className="btn btn-primary mb-3"
                onClick={initializeJanus}
                disabled={!isInitialized}
            >
                시작
            </button>

            <VideoroomComponent devices={devices} restartCapture={restartCapture} />

            {mystream && (
                <div>
                    <h3>Local Stream</h3>
                    <video
                        autoPlay
                        muted
                        style={{ width: "100%" }}
                        ref={(video) => {
                            if (video && mystream) video.srcObject = mystream;
                        }}
                    />
                </div>
            )}
        </div>
    );
};

const VideoroomComponent = ({ devices, restartCapture }) => {
    const [audioDevice, setAudioDevice] = useState("");
    const [videoDevice, setVideoDevice] = useState("");

    const handleAudioDeviceChange = (event) => {
        setAudioDevice(event.target.value);
        restartCapture();
    };

    const handleVideoDeviceChange = (event) => {
        setVideoDevice(event.target.value);
        restartCapture();
    };

    return (
        <div>
            <h3>Device Selector</h3>
            <div>
                <label htmlFor="audio-device">Audio Input:</label>
                <select id="audio-device" value={audioDevice} onChange={handleAudioDeviceChange}>
                    {devices
                        .filter((device) => device.kind === "audioinput")
                        .map((device) => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label || device.deviceId}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <label htmlFor="video-device">Video Input:</label>
                <select id="video-device" value={videoDevice} onChange={handleVideoDeviceChange}>
                    {devices
                        .filter((device) => device.kind === "videoinput")
                        .map((device) => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label || device.deviceId}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
};

export default VideoroomComponent;