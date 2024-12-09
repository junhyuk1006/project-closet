import {useEffect} from "react";

function FetchInquiry ({ item_id, onInquiryFetch }) {
    useEffect(() => {
        fetch(`http://localhost:80/api/inquiry/getInquiries/${item_id}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error("Network response was not ok")
                }
                return response.json();
            })
            .then((data) => {
                if(data) {
                    onInquiryFetch(data);
                }
            })
            .catch((error) =>
                console.log("Error fetching item data:", error)
            );
    }, [])
    return null;
}
export default FetchInquiry