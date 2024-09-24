import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/community.css";
import AddAFriend from "../components/main/addAFriend";
import FriendsList from "../components/main/friendsList";
import FriendInfo from "../components/main/friendInfo";

function Community() {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading]);

  //Manejo de pantalla de amigos
  const [friendsPage, setFriendsPage] = useState(true);
  //Manejo de contenido principal
  const [friendInfo, setFriendInfo] = useState(null);

  return (
    <div className="main-community">
      <section className="friends">
        <span className="frieds-switch">
          <button
            style={{
              background: friendsPage ? "white" : "#242424",
              color: friendsPage ? "black" : "white",
            }}
            onClick={() => {
              setFriendsPage(true);
            }}
          >
            Your friends
          </button>
          <button
            style={{
              background: friendsPage ? "#242424" : "white",
              color: friendsPage ? "white" : "black",
            }}
            onClick={() => {
              setFriendsPage(false);
            }}
          >
            Add a friend
          </button>
        </span>
        {friendsPage ? (
          <FriendsList setFriendInfo={setFriendInfo} />
        ) : (
          <AddAFriend />
        )}
      </section>
      <FriendInfo friendInfo={friendInfo} />
    </div>
  );
}

export default Community;
