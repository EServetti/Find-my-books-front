import axios from "axios";
import { path } from "../path";

async function updatePhoto(user_id, newPhoto, setChange, change, setImgSrc, setError) {
    axios.put(`${path}/api/users/${user_id}`, {
        photo: newPhoto
    }, {withCredentials: true}).then((res) => {
        const response = res.data
        if (response.statusCode === 200) {
            setChange(!change)
            setError("")
            setImgSrc("")
        } else {
            setError(response.message)
            setImgSrc("")
        }
    })
}

export default updatePhoto