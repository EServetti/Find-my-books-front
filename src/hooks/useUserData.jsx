import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function useUserData() {
  const {setUser, change} = useContext(UserContext);
  useEffect(() => {
    async function fetchUserData() {
      axios
        .post("http://localhost:8080/api/sessions/data", {}, {withCredentials: true})
        .then((res) => {
          const response = res.data
          if (response.statusCode === 200) {
            setUser(response.message)
          } 
        });
    }
    fetchUserData();
  }, [change]);
}

export default useUserData