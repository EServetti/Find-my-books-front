import { useContext, useEffect } from "react";
import "../styles/bookList.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function BookList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const books = user ? user.books : null;

  return (
    <div className="main-book-list">
      <aside className="book-list-aside"></aside>
      <div className="book-list">
        {!books ? (
          <span>Loading...</span>
        ) : books.length === 0 ? (
          <span>You don't have any book in list</span>
        ) : (
          books.map((book) => {
            return (
              <div className="book-in-list">
                <img
                  src={
                    book.coverImage !== "No image available"
                      ? book.coverImage
                      : "/img/book.png"
                  }
                  alt="book-image"
                />
                <section className="book-in-list-info">
                  <span>{book.title}</span>
                  <span>{book.authors}</span>
                  <span>Published: {book.publishedDate}</span>
                  <a href={book.infoLink}>More info</a>
                </section>
                <section className="manage-book-in-list">
                  <span>
                    <button>Mark as read</button>
                    Here must be read
                  </span>
                  <button>Delete of my list</button>
                </section>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BookList;
