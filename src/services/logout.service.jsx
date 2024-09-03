import axios from "axios";
import { path } from "../path";

async function logout(setChange, change) {
  axios
    .post(
      `${path}/api/sessions/logout`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        setChange(!change);
      } else {
        console.log(response);
      }
    });
}

export default logout;
