import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function useUserData() {
  const {setUser} = useContext(UserContext);
  useEffect(() => {
    async function fetchUserData() {
      axios
        .post("http://localhost:8080/api/sessions/data", {
          withCredentials: true,
        })
        .then((response) => {
        //   console.log(response.data);
        });
    }
    fetchUserData();
  }, [setUser]);
}

export default useUserData