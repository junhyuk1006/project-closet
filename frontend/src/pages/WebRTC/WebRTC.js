import React from "react";
import { JanusProvider } from "./JanusContext";
import VideoroomInitialization from "./VideoroomInitialization";
import StartButtonComponent from "./StartButtonComponent";
import RegisterUsername from "./RegisterUsername";
import PublishOwnFeed from "./PublishOwnFeed";
import LocalStreamComponent from "./LocalStreamComponent";
import RemoteFeeds from "./RemoteFeeds";
import AttachPlugin from "./AttachPlugin";

function WebRTC() {
    return (
        <JanusProvider>
            <div className="container mt-5">
                {/* AttachPlugin은 초기화만 수행 */}
                <AttachPlugin />
                <RegisterUsername />
                <VideoroomInitialization />
                <StartButtonComponent />
                <PublishOwnFeed />
                <LocalStreamComponent />
                <RemoteFeeds />
            </div>
        </JanusProvider>
    );
}

export default WebRTC;