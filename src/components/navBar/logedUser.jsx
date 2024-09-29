import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import logout from "../../services/logout.service";
import notiImg from "../../assets/unread-noti.png";

function LogedUser() {
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
        <span className="user-image-navBar">
            <img className="navBar-image" src={user.photo} alt="user" />
            {user.unReadNotifications ? (
              <img className="unread-notification" src={notiImg} />
            ) : (
              <></>
            )}
        </span>
        {isOpen && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/account">Account</Link>
              {user.unReadNotifications ? (
                <img src={notiImg} />
              ) : (
                <></>
              )}
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

export default LogedUser;
