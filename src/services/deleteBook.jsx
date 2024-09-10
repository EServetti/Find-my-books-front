import axios from "axios";
import { path } from "../path";

async function destroy(id, setChange, change) {
  axios
    .delete(
      `${path}/api/books/${id}`,
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        setChange(!change);
      } else {
        // location.reload()
        console.log(response);
      }
    });
}

export default destroy;
