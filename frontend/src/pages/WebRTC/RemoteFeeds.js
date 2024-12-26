import React from "react";
import { useJanus } from "./JanusContext";

const RemoteFeeds = () => {
    const { feeds } = useJanus();

    return (
        <div>
            <h3>Remote Feeds</h3>
            {feeds.map((feed) => (
                <div key={feed.id} style={{ marginBottom: "20px" }}>
                    <h4>{feed.display || `Feed ${feed.id}`}</h4>
                    {feed.stream && (
                        <video
                            autoPlay
                            playsInline
                            ref={(video) => {
                                if (video) video.srcObject = feed.stream;
                            }}
                            style={{ width: "100%", border: "1px solid black" }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default RemoteFeeds;