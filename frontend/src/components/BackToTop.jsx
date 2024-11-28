import React from "react";
import { useScrollVisibility } from "../hooks/useScrollVisibility";

function BackToTop() {
    const isVisible = useScrollVisibility(200);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button className="back-to-top-btn" onClick={handleScrollToTop}>
                Back to Top
            </button>
        )
    );
}

export default BackToTop;