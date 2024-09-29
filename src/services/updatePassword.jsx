import axios from "axios";
import { path } from "../path.js";
import Swal from "sweetalert2";

async function updatePassword(token, data, setError) {
  const {pass1} = data
  const {pass2} = data
  if (!pass1) {
    setError("Please enter the passwords");
  } else if (pass1 !== pass2) {
    setError("Passwords must match");
  } else {
    axios
      .put(
        `${path}/api/users/password/${token}`,
        { password: pass1 },
        { withCredentialsInclude: true }
      )
      .then((res) => {
        const response = res.data;
        if (response.statusCode === 200) {
          setError("");
          Swal.fire({
            title: "Updated!",
            text: response.message,
            customClass: {
              popup: "custom-popup",
              title: "custom-title",
              content: "custom-content",
              confirmButton: "custom-confirm-button",
            },
            confirmButtonText: "",
          })
        } else {
            setError(response.message);
        }
      });
  }
}

export default updatePassword;
