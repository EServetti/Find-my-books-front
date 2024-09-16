import { useParams } from "react-router-dom";
import "../styles/book.css";
import useBook from "../hooks/useBook";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import addToList from "../services/addToList";
import { Link } from "react-router-dom";
import ShareFriends from "../components/main/shareFriends";

function BookPage() {
  const { isbn } = useParams();
  const { book, loading, error, related } = useBook(isbn);
  const { user, change, setChange } = useContext(UserContext);
  const bookCover = "/img/book.png";

  const coverMini = loading
    ? null
    : book.coverImage !== "No image available"
    ? book.coverImage
    : "/img/book.png";

  //Manejo de agregacion a lista
  const [addError, setAddError] = useState(null);
  function handleClick() {
    addToList(book, setAddError, setChange, change);
  }

  function title(title) {
    let newTitle = title.split(" ");
    if (newTitle.lenght <= 4) {
      return newTitle;
    } else {
      newTitle = newTitle.slice(0, 4).join(" ");
      newTitle = newTitle + "...";
      return newTitle;
    }
  }

  //Compartir con un amigo
  const [sharing, setSharing ] = useState(false)
  function handleShare() {
    setSharing(true)
  }

  return (
    <div className="main-book">
      <aside className="book-aside">
        <h2>Related books</h2>
        {loading ? (
          <></>
        ) : related && related.length > 0 ? (
          <section className="related-books">
            <span>
              <img
                src={
                  related[0].coverImage !== "No cover image available"
                    ? related[0].coverImage
                    : "/img/book.png"
                }
                alt="cover-1"
              />
              <Link to={`/book/${related[0].isbn}`}>
                {title(related[0].title)}
              </Link>
            </span>
            <span>
              <img
                src={
                  related[1].coverImage !== "No cover image available"
                    ? related[1].coverImage
                    : "/img/book.png"
                }
                alt="cover-2"
              />
              <Link to={`/book/${related[1].isbn}`}>
                {title(related[1].title)}
              </Link>
            </span>
            <span>
              <img
                src={
                  related[2].coverImage !== "No cover image available"
                    ? related[2].coverImage
                    : "/img/book.png"
                }
                alt="cover-3"
              />
              <Link to={`/book/${related[2].isbn}`}>
                {title(related[2].title)}
              </Link>
            </span>
          </section>
        ) : (
          <></>
        )}
        <button onClick={() => handleShare()}>Share with a friend</button>
      </aside>
      <div className="book-content">
        {sharing && <ShareFriends book={book} setSharing={setSharing} sharing={sharing}/>}
        {error ? (
          <h3 className="book-error">{error}</h3>
        ) : loading && !error ? (
          <h3 className="book-error">Loading...</h3>
        ) : (
          <>
            <section className="book-cover">
              <img src={bookCover} alt={book.title} />
            </section>
            <section className="book-info">
              <span className="title-and-immage">
                <h1>{book.title}</h1>
                <img src={coverMini} alt="cover-mini" />
              </span>
              <h2>{book.authors.join(", ")}</h2>
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p>
                <strong>Published Date:</strong> {book.publishedDate}
              </p>
              <p>
                <a href={book.infoLink}>
                  <strong>More Info</strong>{" "}
                </a>
              </p>
              <p>{book.description}</p>
              <span className="add-button-span">
                <button onClick={handleClick}>Add to my list</button>
                {!addError ? <></> : <p>{addError}</p>}
              </span>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default BookPage;
