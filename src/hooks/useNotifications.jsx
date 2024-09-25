import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../path";

function useNotifications(notiChange) {
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState(null)

    useEffect(()=>{
        axios.get(`${path}/api/users/notifications`,{withCredentials: true}).then((res) => {
            const response = res.data
            if (response.statusCode === 200) {
                setNotifications(response.message)
                setLoading(false)
            } else {
                setNotifications(null)
                setLoading(false)
            }
        })
    },[notiChange])

    return {notifications, loadingNotifications: loading}
}

export default useNotifications