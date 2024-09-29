import ChatandInfo from "./chatandInfo";

function FriendInfo({ friendInfo }) {
  
  return (
    <div className="main-friend-info">
      {!friendInfo && (
        <section className="no-friend-info">
          <span>Here'll apear your friends' info, you can:</span>
          <ul>
            <li>See their info</li>
            <li>Share books with them</li>
            <li>Get books from them</li>
          </ul>
        </section>
      )}
      {friendInfo && (
        <ChatandInfo friendInfo={friendInfo}/>
      )}
    </div>
  );
}

export default FriendInfo;
