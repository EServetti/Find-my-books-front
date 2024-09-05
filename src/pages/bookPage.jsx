import { useParams } from "react-router-dom";
import "../styles/book.css";
import useBook from "../hooks/useBook";
import defaultBookCover from "../assets/book.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import addToList from "../services/addToList";

function BookPage() {
  const { isbn } = useParams();
  const { book, loading, error } = useBook(isbn);
  const { user, change, setChange } = useContext(UserContext);
  const bookCover = loading
    ? null
    : book.coverImage !== "No image available"
    ? book.coverImage
    : defaultBookCover;

  //Manejo de agregacion a lista
  const [addError, setAddError] = useState(null);
  function handleClick() {
    addToList(book, setAddError, user, setChange, change);
  }
  return (
    <div className="main-book">
      {error ? (
        <h3>{error}</h3>
      ) : loading && !error ? (
        <h3>Loading...</h3>
      ) : (
        <div className="book-content">
          {book && (
            <>
              <section className="book-cover">
                <img src={bookCover} alt={book.title} />
              </section>
              <section className="book-info">
                <h1>{book.title}</h1>
                <h2>{book.authors.join(", ")}</h2>
                <p>
                  <strong>Publisher:</strong> {book.publisher}
                </p>
                <p>
                  <strong>Published Date:</strong> {book.publishedDate}
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
      )}
    </div>
  );
}

export default BookPage;
