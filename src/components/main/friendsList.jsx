import { useState } from "react";
import useFriends from "../../hooks/useFriends";

function FriendsList({setFriendInfo}) {
  //Manejo de lista de amigos
  const { friends, loading } = useFriends();

  const [onFriend, setOnFriend ] = useState(null)

  function handleClick(index, friend) {
    setOnFriend(index)
    setFriendInfo(friend)
  }
  return (
    <section className="friends-list">
      {loading ? (
        <span>Loading...</span>
      ) : !friends || friends.length === 0 ? (
        <span>You don't have any friends yet, invite them and share your books!</span>
      ) : (
        friends.map((friend, index) => (
          <div className="friend" key={index} onClick={() => handleClick(index, friend)} style={{boxShadow: onFriend === index ?" 0 0 5px 0 white" : "none"}}>
            <img className="friend-img" src={friend.photo} alt="user photo" />
            <section className="friend-info">
              <span>{friend.name}</span>
              <span className="friends-email">{friend.email}</span>
            </section>
          </div>
        ))
      )}
    </section>
  );
}

export default FriendsList;
