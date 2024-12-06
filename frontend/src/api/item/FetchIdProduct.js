import React, {useEffect} from "react";

function FetchIdProduct ({ id, onItemFetch }) {
    useEffect(() => {
        if(id) {
            fetch(`http://localhost:80/api/itemDetail/${id}`)
                .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json();
            }).then((data) => {
                if (onItemFetch) {
                    onItemFetch(data)
                    console.log(data)
                }
            }).catch((error) =>
                console.log("Error fetching item data:", error)
            );
        }
    }, [id]);
    return null;

}

export default FetchIdProduct;