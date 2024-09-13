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
        <>
          <section className="friends-data">
            <img src={friendInfo.photo} alt="user photo" />
            <span>
              <p>{friendInfo.name}</p>
              <p>Books in list: {friendInfo.booksQuant}</p>
              <p>Read Books: {friendInfo.readBooks}</p>
            </span>
          </section>
          <section className="chat"></section>
        </>
      )}
    </div>
  );
}

export default FriendInfo;
