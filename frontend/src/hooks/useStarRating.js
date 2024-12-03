import { useState } from "react";

function useStarRating(initialRating = 0) {
    const [rating, setRating] = useState(initialRating);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleMouseEnter = (index) => {
        setHoveredRating(index);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (index) => {
        setRating(index);
    };

    return {
        rating,
        hoveredRating,
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
    };
}

export default useStarRating;