import axios from "axios";
import { path } from "../path.js";

async function find(description, setLogError, setBooks) {
  if (!description) {
    setLogError("Please enter a description first")
  } else {
    axios.post(`${path}/api/books`, { description }, { withCredentials: true }).then((res) => {
        const response = res.data
        if(response.statusCode === 200) {
            setLogError(null)
            setBooks(response.message)
        } else {
            setLogError(response.message)
        }
      })
  }
}

export default find