import React from "react";
import { useJanus } from "./JanusContext";

const PublishOwnFeed = () => {
    const { publishOwnFeed, isPublishing } = useJanus();

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() => publishOwnFeed(true)}
                disabled={isPublishing}
            >
                {isPublishing ? "Publishing..." : "Publish Feed"}
            </button>
        </div>
    );
};

export default PublishOwnFeed;