import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../path.js";

function useShared(_id) {
  const [shared, setShared ] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`${path}/api/books/shared/${_id}`, { withCredentials: true })
      .then((res) => {
        const response = res.data;
        if(response.statusCode === 200) {
            setShared(response.message)
            setLoading(false)
        } else {
            setShared(null)
            setLoading(false)
        }
      });
  }, [_id]);
  return {shared, loading}
}

export default useShared
