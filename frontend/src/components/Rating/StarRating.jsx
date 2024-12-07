import React, {useState } from "react";

function StarRating({ totalStars = 5, onRatingChange}) {
    const [rating, setRating] = useState(0);

    const handleClick = (starIndex) => {
        setRating(starIndex);
        if(onRatingChange) onRatingChange(starIndex);
    }

    const getStarType = (index) => {
        if (rating >= index) return "zmdi-star"; // 선택된 별
        return "zmdi-star-outline"; // 선택되지 않은 별
    };

    return (
        <div className="wrap-rating" style={{ display: "flex", alignItems: "center" }}>
            {Array.from({ length: totalStars }, (_, index) => {
                const starIndex = index + 1;
                const starType = getStarType(starIndex);

                return (
                    <i
                        key={starIndex}
                        className={`zmdi ${starType}`}
                        style={{
                            fontSize: "19px", // 별 크기
                            color: "#f4c430", // 이미지 색상 반영
                            cursor: "pointer",
                            margin: "0 0px",
                        }}
                        onClick={() => handleClick(starIndex)}
                    ></i>
                );
            })}
            <input type="hidden" value={rating} name="rating" />
        </div>
    );
}

export default StarRating;