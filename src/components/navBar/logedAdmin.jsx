import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import logout from "../../services/logout.service";
import { UserContext } from "../../context/UserContext";

function LogedAdmin() {
  const { user, change, setChange } = useContext(UserContext);
  //Manejar los datos del user
  const [isOpen, setIsOpen] = useState(false);

  function handleUserData() {
    setIsOpen(!isOpen);
  }

  //Manejar el logout
  function handleLogout() {
    logout(setChange, change);
  }

  return (
    <nav>
      <span className="navBar-title">Find your books</span>
      <Link to="/">Home</Link>
      <Link to="/list">To read</Link>
      <Link to="/community">Community</Link>
      <span onClick={handleUserData} className="user-data">
        <img src={user.photo} alt="user" />
        {isOpen && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </li>
          </ul>
        )}
      </span>
    </nav>
  );
}

export default LogedAdmin;
