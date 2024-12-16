import { useEffect } from "react";

function FetchAllReview({ item_id, onReviewFetch }) {
    useEffect(() => {
        fetch(`http://localhost:80/api/findAllReview/${item_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    onReviewFetch(data);
                }
            })
            .catch((error) => console.error("Error fetching item data:", error));
    }, [item_id, onReviewFetch]);

    return null;
}

export default FetchAllReview;