import axios from "axios";
import {path} from "../path.js"

async function update(id, read, setChange, change) {
    axios.put(`${path}/api/books/${id}`, {
        read: !read
    }, {withCredentials: true}).then((res) => {
        const response = res.data
        if (response.statusCode === 200) {
            setChange(!change)
        } else {
            location.reload()
        }
    })
}

export default update