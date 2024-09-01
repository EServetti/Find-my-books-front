import axios from "axios"

async function login(data, setLogError, navigate, setChange, change) {
    const {email, password} = data
    if (!email || !password) {
        setLogError("Please enter your email and password")
    } else {
        axios.post("http://localhost:8080/api/sessions/login", {
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