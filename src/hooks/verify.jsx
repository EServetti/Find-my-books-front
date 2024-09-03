import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../path";

function useVerify(email, verifyCode) {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.put(
      `${path}/api/sessions/verify/${email}/${verifyCode}`,
      {
        withCredentials: true,
      }
    ).then((res) => {
        const response = res.data
        setMessage(response)
        setLoading(false)
    })
  }, []);

  return {message, loading}
}

export default useVerify