import { useState, useEffect } from "react";

const useJanusInitialization = () => {
    const [version] = useState(1.2);
    const [server] = useState("https://janus.jsflux.co.kr/janus");
    const [janus, setJanus] = useState(null);
    const [sfutest, setSfutest] = useState(null);
    const [opaqueId] = useState(`videoroomtest-${Math.random().toString(36).substring(2, 15)}`);
    const [myroom, setMyroom] = useState(34);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const room = urlParams.get("room");
        if (room) setMyroom(parseInt(room));
    }, []);

    return {
        version,
        server,
        janus,
        setJanus,
        sfutest,
        setSfutest,
        opaqueId,
        myroom,
        setMyroom,
        feeds,
        setFeeds,
    };
};

export default useJanusInitialization;