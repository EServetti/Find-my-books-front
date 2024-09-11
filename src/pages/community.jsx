import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/community.css";
import lookFriend from "../services/lookFriend";

function Community() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  //Manejo de pantalla de amigos
  const [friends, setFriends] = useState(true);

  //Manejo de busqueda de amigos
  const [inpValue, setInpValue] = useState("")
  const [foundUser, setFoundUser] = useState(null)
  const [error, setError] = useState(null)
  function handleChange (e) {
    setInpValue(e.target.value)
  }
  function handleClick() {
    lookFriend(inpValue, setError, setFoundUser)
  }

  return (
    <div className="main-community">
      <section className="friends">
        <span className="frieds-switch">
          <button
            onClick={() => {
              setFriends(true);
            }}
          >
            Your friends
          </button>
          <button
            onClick={() => {
              setFriends(false);
            }}
          >
            Add a friend
          </button>
        </span>
        {friends ? (
          <section>You are in frieds section</section>
        ) : (
          <section className="add-a-friend">
            <span className="look-a-friend">
              <input type="text" placeholder="Enter the email of a user" value={inpValue} onChange={handleChange} />
              <button onClick={handleClick}>
                <img src="./src/assets/glass.png" alt="glass" />
              </button>
            </span>
            {error ? <span className="error">{error}</span> : <></>}
          </section>
        )}
      </section>
    </div>
  );
}

export default Community;
