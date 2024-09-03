import { useParams } from "react-router-dom";
import "../styles/book.css";
import useBook from "../hooks/useBook";

function BookPage() {
  const { title } = useParams();
  const { book, loading, error } = useBook(title);

  return (
    <div className="main-book">
      {error && <h3>{error}</h3>}
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="book-content">
          {book && (
            <>
              <section className="book-cover">
                <img src={book.coverImage} alt={book.title} />
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
                <button>Add to my list</button>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BookPage;
