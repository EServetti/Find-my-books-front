import axios from "axios";
import { path } from "../path";
import Swal from "sweetalert2";

async function register(data, setLogError, navigate) {
  const { email, name, password, password2 } = data;
  if (!email || !name || !password || !password2) {
    setLogError("Please fill out the form");
  } else if (password !== password2) {
    setLogError("Passwords must match");
  } else {
    axios
      .post(
        `${path}/api/sessions/register`,
        {
          email: email,
          name: name,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        if (response.statusCode === 200) {
          Swal.fire({
            title: "You're welcome",
            text: "We've sent you a verification mail",
            customClass: {
              popup: "custom-popup",
              title: "custom-title",
              content: "custom-content",
              confirmButton: "custom-confirm-button",
            },
            confirmButtonText: "",
          }).then(() => {
            navigate("/login");
          })
        } else {
          setLogError(response.message);
        }
      });
  }
}

export default register;
