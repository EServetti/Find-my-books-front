import useFriends from "../../hooks/useFriends";
import "../../styles/bookList.css";
import closeImg from "../../assets/close.png";
import { useState } from "react";
import share from "../../services/shareBook";

function ShareFriends({ setSharing, sharing, book }) {

  const { loading, friends } = useFriends();
  //compartir con un amigo
  const [sharedWith, setSharedWith ] = useState([])
  const [error, setError ] = useState(null)
  const [message, setMessage ] = useState(null)
  function handleClick(_id) {
    setSharedWith((prevSharedWith) => {
      if (prevSharedWith.includes(_id)) {
        return prevSharedWith.filter(id => id !== _id);
      } else {
        return [...prevSharedWith, _id];
      }
    });
  }

  function handleShare() {
    share(sharedWith, book, setError, setMessage)
  }


  return (
    <section className="share-friends-list">
      <span className="close-button">
        <button onClick={() => setSharing(!sharing)}>
          <img src={closeImg} />
        </button>
      </span>
      {loading ? (
        <p>Loading...</p>
      ) : (
        friends.map((f) => (
          <div onClick={() => handleClick(f._id)} className={`share-friend ${sharedWith.includes(f._id) ? 'selected' : ''}`} key={f._id}>
            <img src={f.photo} alt="user" />
            <span>
              <p>{f.name}</p>
              <p>{f.email}</p>
            </span>
          </div>
        ))
      )}
      <span style={{color: "red"}}>{error && error}</span>
      <span>{message && message}</span>
      <span className="share-button">
        <button onClick={handleShare}>Share</button>
      </span>
    </section>
  );
}

export default ShareFriends;