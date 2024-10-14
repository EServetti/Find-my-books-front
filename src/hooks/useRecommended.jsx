import axios from "axios";
import { path } from "../path";
import { useEffect, useState } from "react";

function useRecommended() {
    const [loadingRec, setLoadingRec ] = useState(true)
    const [recommended, setRecommended ] = useState(null)

    useEffect(()=>{
        axios.get(`${path}/api/books/recommended`,{withCredentials: true}).then((res) => {
            const response = res.data
            if (response.statusCode === 200) {
                setLoadingRec(false)
                setRecommended(response.message)
            } else {
                setLoadingRec(false)
                setRecommended([])
            }
        })
    },[])
    
    return {loadingRec, recommended}
}

export default useRecommended