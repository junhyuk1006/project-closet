import React from "react";
import { useJanus } from "./JanusContext";

const VideoroomInitialization = () => {
    const { server, myroom } = useJanus();

    return (
        <div>
            <h2>Janus Initialization</h2>
            <p>Server: {server}</p>
            <p>Room: {myroom}</p>
        </div>
    );
};

export default VideoroomInitialization;