import React, { useEffect } from "react";
import { useJanus } from "./JanusContext";

const AttachPlugin = () => {
    const { janus, myroom, sfutest, subscribeToFeed } = useJanus();

    useEffect(() => {
        if (!janus) {
            console.error("Janus instance is not initialized.");
            return;
        }

        janus.attach({
            plugin: "janus.plugin.videoroom",
            success: (handle) => {
                console.log("VideoRoom plugin attached!");
                // VideoRoom 플러그인 핸들 저장
                handle.send({
                    message: { request: "join", room: myroom, ptype: "publisher" },
                });
            },
            error: (error) => {
                console.error("Failed to attach plugin:", error);
            },
            onmessage: (msg, jsep) => {
                const event = msg.videoroom;

                if (event === "joined" && msg.publishers) {
                    // 새로운 퍼블리셔 구독
                    msg.publishers.forEach((publisher) => {
                        subscribeToFeed(publisher.id);
                    });
                } else if (event === "event") {
                    if (msg.publishers) {
                        // 추가된 퍼블리셔 구독
                        msg.publishers.forEach((publisher) => {
                            subscribeToFeed(publisher.id);
                        });
                    }
                    if (msg.leaving || msg.unpublished) {
                        // 떠난 퍼블리셔 처리
                        console.log("Publisher left:", msg.leaving || msg.unpublished);
                    }
                }

                if (jsep) {
                    sfutest.handleRemoteJsep({ jsep });
                }
            },
        });
    }, [janus, myroom, subscribeToFeed]);

    return null; // UI는 RemoteFeeds 및 LocalStreamComponent에서 관리
};

export default AttachPlugin;