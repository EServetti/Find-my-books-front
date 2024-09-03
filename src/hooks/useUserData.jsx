import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { path } from "../path";

function useUserData() {
  const {setUser, change} = useContext(UserContext);
  useEffect(() => {
    async function fetchUserData() {
      axios
        .post(`${path}/api/sessions/data`, {}, {withCredentials: true})
        .then((res) => {
          const response = res.data
          if (response.statusCode === 200) {            
            setUser(response.message)
          } else {
            setUser(null)
          }
        });
    }
    fetchUserData();
  }, [change]);
}

export default useUserData