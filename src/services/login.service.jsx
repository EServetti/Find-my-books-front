import axios from "axios"
import { path } from "../path"

async function login(data, setLogError, navigate, setChange, change) {
    const {email, password} = data
    if (!email || !password) {
        setLogError("Please enter your email and password")
    } else {
        axios.post(`${path}/api/sessions/login`, {
            email: email,
            password: password
        },{
            withCredentials: true,
        }).then((res) => {
           const response = res.data
           if (response.statusCode === 200) {
            setChange(!change)
            navigate("/")
           } else {
            setLogError(response.message)
           }
        })   
    }
}

export default login