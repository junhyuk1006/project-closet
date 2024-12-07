import {useEffect} from "react";

function FetchAllReview ({ item_id, onReviewFetch }) {
    useEffect(() => {
        fetch(`http://localhost:80/api/findAllReview/${item_id}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error("Network response was not ok")
                }
                return response.json();
            })
            .then((data) => {
                if(data) {
                    onReviewFetch(data);
                    console.log(data)
                }
            })
            .catch((error) =>
                console.log("Error fetching item data:", error)
            );
        }, [])
    return null;
}
export default FetchAllReview