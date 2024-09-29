import axios from "axios";
import { path } from "../path";

async function answerFriendRequest(_id, status, sender_id, receiver_id, setNotiChange, notiChange) {
  axios
    .put(
      `${path}/api/users/friends/${_id}`,
      { status, sender_id, receiver_id },
      { withCredentials: true }
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        setNotiChange(!notiChange)
      } else {
        console.log(response.message);
      }
    });
}

export default answerFriendRequest