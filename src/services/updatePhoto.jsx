import axios from "axios";
import { path } from "../path";

async function updatePhoto(
  user_id,
  newPhoto,
  setChange,
  change,
  setImgSrc,
  setError,
  setImgSelected,
  fileInputRef
) {
  axios
    .put(
      `${path}/api/users/${user_id}`,
      {
        photo: newPhoto,
      },
      { withCredentials: true }
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        setChange(!change);
        setError("");
        setImgSrc("");
        setImgSelected(false);
        fileInputRef.current.value = ""
      } else {
        setError(response.message);
        setImgSrc("");
        setImgSelected(false);
        fileInputRef.current.value = ""
      }
    });
}

export default updatePhoto;
