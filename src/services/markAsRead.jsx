import axios from "axios";
import { path } from "../path";

async function markAsRead(_id, setNotiChange, notiChange) {
  axios
    .put(
      `${path}/api/users/notifications/${_id}`,
      {},
      { withCredentials: true }
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        setNotiChange(!notiChange);
      } else {
        console.log(response.message);
      }
    });
}

export default markAsRead;