import {useEffect} from 'react'

function FetchGetBasket ({ userId, onGetFetch }) {
    useEffect(() => {
        if(userId) {
            fetch(`http://localhost/api/basket/getBasket/${userId}`)
                .then((response) => {
                    if(!response.ok) {
                        throw new Error("getBasket API response error")
                    }
                    return response.json();
                })
                .then((data) => {
                    if(onGetFetch) {
                        onGetFetch(data);
                        console.log("getBasket: ",data)
                    }
                }).catch((error) => console.error("getBasket Fetch Error: ",error))
        }
    }, [userId])
    return null;
}
export default FetchGetBasket;