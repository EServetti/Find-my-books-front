import axios from "axios";
import { path } from "../path.js";
import Swal from "sweetalert2";

async function recover(email, setError, setLoading) {
  setError("");
  setLoading(true);
  axios
    .post(`${path}/api/users/recover`, { email }, { withCredentials: true })
    .then((res) => {
      setLoading(false);
      const response = res.data;
      if (response.statusCode === 200) {
        setError("");
        Swal.fire({
          title: response.message,
          text: "Use it to change the password, if you can't see it look in the spam section.",
          customClass: {
            popup: "custom-popup",
            title: "custom-title",
            content: "custom-content",
            confirmButton: "custom-confirm-button",
          },
          confirmButtonText: "",
        });
      } else {
        setError(response.message);
      }
    });
}

export default recover;
