import React from "react";

const ImageComponent = () => {
    const filename = "blog-03.jpg"; // 고정된 파일 이름
    const imageUrl = `http://localhost:80/api/images/${filename}`; // 백엔드 이미지 API URL

    return (
        <div>
            <img src={imageUrl} alt={filename} style={{ width: "1000px", height: "auto" }} />
        </div>
    );
};

export default ImageComponent;