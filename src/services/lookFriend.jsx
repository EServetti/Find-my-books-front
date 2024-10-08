import {path} from "../path.js"
import axios from "axios";

async function lookFriend(email, setError, setFoundUser) {
    if(!email) {
        setFoundUser(null)
        setError("Please enter the email")
    } else {
        axios.get(`${path}/api/users?email=${email}`, {withCredentials: true}).then((res) => {
            const response =  res.data
            if (response.statusCode === 200) {
                setFoundUser(response.message)
                setError(null)
            } else {
                setFoundUser(null)
                setError(response.message)
            }
        })
    }
}

export default lookFriend