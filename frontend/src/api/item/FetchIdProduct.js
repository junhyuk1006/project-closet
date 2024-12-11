import { useEffect } from "react";

function FetchIdProduct({ id, onItemFetch }) {
    useEffect(() => {
        if (id) {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:80/api/itemDetail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // JWT 토큰 추가
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (onItemFetch) {
                        onItemFetch(data);
                    }
                })
                .catch((error) =>
                    console.log("Error fetching item data:", error)
                );
        }
    }, [id]);

    return null; // UI 렌더링 없음
}

export default FetchIdProduct;