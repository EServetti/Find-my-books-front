import useShared from "../../hooks/useShared";

function ChatandInfo({ friendInfo }) {
  const { shared, loading } = useShared(friendInfo._id);
  return (
    <>
      <section className="friends-data">
        <img src={friendInfo.photo} alt="user photo" />
        <span>
          <p>{friendInfo.name}</p>
          <p>Books in list: {friendInfo.booksQuant}</p>
          <p>Read Books: {friendInfo.readBooks}</p>
        </span>
      </section>
      <section className="chat">
        {!loading && !shared ? (
          <section className="no-shared">
            <h4>{friendInfo.name} hasn't shared anything with you yet, wait for him to send you something or share a book with him!</h4>
          </section>
        ) : (
          <section className="shared-books">
            <span>Here'll be the shared books</span>
          </section>
        )}
      </section>
    </>
  );
}

export default ChatandInfo;
