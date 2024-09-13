import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { path } from "../path";

function useUserData() {
  const {setUser, change, setLoading} = useContext(UserContext);
  useEffect(() => {
    async function fetchUserData() {
      axios
        .post(`${path}/api/sessions/data`, {}, {withCredentials: true})
        .then((res) => {
          const response = res.data
          if (response.statusCode === 200) {    
            setUser(response.message)
            setLoading(false)
          } else {
            setUser(null)
            setLoading(false)
          }
        });
    }
    fetchUserData();
  }, [change]);
}

export default useUserData