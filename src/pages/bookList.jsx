import { useContext, useEffect } from "react";
import "../styles/bookList.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import update from "../services/updateBook";
import destroy from "../services/deleteBook";

function BookList() {
  const navigate = useNavigate();
  const { user, change, setChange } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const books = user ? user.books : null;

  //Manejo de libros 
  function handleUpdate(id, read) {
    update(id, read, setChange, change)
  }

  function handleDelete(id) {
    destroy(id, setChange, change)
  }

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
              <div key={book._id} className="book-in-list">
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
                  <span className="read-span">
                    <button onClick={() => handleUpdate(book._id, book.read)}>{book.read? "Read" : "Uread"}</button>
                    <img src={book.read? "./src/assets/checked.png" : "./src/assets/remove.png"} alt="read" />
                  </span>
                  <button>Share with a friend</button>
                  <button onClick={() => handleDelete(book._id)}>Delete of my list</button>
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
