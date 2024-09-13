import axios from "axios";
import { path } from "../path";
import { useEffect, useState } from "react";

function useFriends() {
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${path}/api/users/friends`, { withCredentials: true })
      .then((res) => {
        const response = res.data;
        if (response.statusCode === 200) {
          setFriends(response.message);
          setLoading(false)
        }
        else if(response.statusCode === 404) {
            setFriends([]);
            setLoading(false)
        } else {
            location.replace("/")
        }
      });
  }, []);
  return { friends, loading };
}

export default useFriends;
