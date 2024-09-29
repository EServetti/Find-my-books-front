import { useContext } from "react";
import useShared from "../../hooks/useShared";
import SharedBook from "./sharedBook";
import { UserContext } from "../../context/UserContext";

function ChatandInfo({ friendInfo }) {
  const { shared, loading } = useShared(friendInfo._id);
  const { user } = useContext(UserContext);
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
            <h4>
              {friendInfo.name} hasn't shared anything with you yet, wait for
              him to send you something or share a book with him!
            </h4>
          </section>
        ) : (
          <>
            {loading && <h3>Loading...</h3>}
            {shared &&
              shared.map((book) => (
                <SharedBook
                  key={book._id}
                  user_id={user._id}
                  sharedBy={book.sharedBy}
                  createdAt={book.createdAt}
                  friendName={friendInfo.name}
                  //book info
                  authors={book.book.authors}
                  coverImage={book.book.coverImage}
                  description={book.book.description}
                  infoLink={book.book.infoLink}
                  isbn={book.book.isbn}
                  publishedDate={book.book.publishedDate}
                  publisher={book.book.publisher}
                  title={book.book.title}
                />
              ))}
          </>
        )}
      </section>
    </>
  );
}

export default ChatandInfo;
