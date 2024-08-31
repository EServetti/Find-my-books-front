import { useContext } from "react";
import useUserData from "../../hooks/useUserData";
import NoLoged from "./noLoged";
import { UserContext } from "../../context/UserContext";
import LogedUser from "./logedUser";
import LogedAdmin from "./logedAdmin";

function NavBar() {
  useUserData();
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <NoLoged />}
      {user?.role === "user" && <LogedUser />}
      {user?.role === "admin" && <LogedAdmin />}
    </>
  );
}

export default NavBar;
