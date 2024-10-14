import axios from "axios";
import { path } from "../path";

async function updatePage(_id, originalPages, newPages, setChange, change) {
    if (originalPages === Number(newPages)) {
        return null
    }
  axios
    .put(
      `${path}/api/books/${_id}`,
      { readPages: newPages },
      { withCredentials: true }
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        setChange(!change)
      } else {
        return null
      }
    });
}

export default updatePage
