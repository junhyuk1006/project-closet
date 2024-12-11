import {useEffect} from "react"

function FetchSaveBasket({ userId, onSaveFetch }) {
    if(userId) {
        useEffect(() => {
            fetch(`http://localhost:80/api/basket/saveBasket/${userId}`)
                .then((response) => {
                    if(!response.ok){
                        throw new Error("no")
                    }
                    return response.json();
                })
                .then((data) => {
                    if(onSaveFetch) {
                        onSaveFetch(data)
                    }
                })
                .catch((error) => console.log("this is (SaveBasket): ", error))
        }, []);
        return null;
    }
}
export default FetchSaveBasket;