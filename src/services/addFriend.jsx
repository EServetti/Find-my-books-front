import { path } from "../path.js";
import axios from "axios";
import Swal from "sweetalert2";

async function addFriend(_id, setError) {
  axios
    .post(`${path}/api/users/add/${_id}`, {}, { withCredentials: true })
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        Swal.fire({
            title: "Sent",
            text: response.message,
            customClass: {
              popup: "custom-popup",
              title: "custom-title",
              content: "custom-content",
              confirmButton: "custom-confirm-button",
            },
            confirmButtonText: "",
          });
        setError(null);
      } else {
        setError(response.message);
      }
    });
}

export default addFriend;
