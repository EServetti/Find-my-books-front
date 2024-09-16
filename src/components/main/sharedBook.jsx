import { useContext, useState } from "react";
import addToList from "../../services/addToList";
import { UserContext } from "../../context/UserContext";

function SharedBook({
  user_id,
  sharedBy,
  createdAt,
  friendName,
  authors,
  coverImage,
  description,
  infoLink,
  isbn,
  publishedDate,
  publisher,
  title,
}) {
  const bookImage =
    coverImage !== "No cover image available" && coverImage !== "No image available" ? coverImage : "/img/book.png";
  const own = user_id === sharedBy;
  const sharedDate = new Date(createdAt).toLocaleString();
  //Manejo de agregacion de libro
  const {change, setChange } = useContext(UserContext)
  const [error, setError ] = useState(null)
  const book = {
    authors: [authors],
    coverImage,
    description,
    infoLink,
    isbn,
    publishedDate,
    publisher,
    title
  }
  function handleClick() {
    addToList(book, setError, setChange, change)
  }
  return (
    <>
      {own ? (
        <div className="shared-book-own">
          <img src={bookImage} alt="book" />
          <section className="shared-info">
            <p>{title}</p>
            <a href={infoLink}>More Info</a>
            You shared with {friendName} on {sharedDate}
          </section>
        </div>
      ) : (
        <div className="shared-book-friend">
          <span className="add-and-error">
            <button onClick={handleClick}>Add to list</button>
            {error && <span className="error">{error}</span>}
          </span>
          <section className="shared-info">
            <p>{title}</p>
            <a href={infoLink}>More Info</a>
            {friendName} shared with you on {sharedDate}
          </section>
          <img src={bookImage} alt="book" />
        </div>
      )}
    </>
  );
}

export default SharedBook;
