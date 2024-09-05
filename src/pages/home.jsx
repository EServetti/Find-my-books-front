import { useContext, useState } from "react";
import "../styles/home.css";
import find from "../services/findBook";
import Book from "../components/main/book";
import { Link } from "react-router-dom";
import {UserContext} from "../context/UserContext"

function Home() {
  const {user} = useContext(UserContext)

  //Manejo del input
  const [inpValue, setInpValue] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setInpValue(value);
  }

  //Envio de descripción
  const [logError, setLogError] = useState(null);
  const [books, setBooks] = useState(null);

  function handleClick() {
    find(inpValue, setLogError, setBooks);
  }

  return (
    <div className="main-home">
      <aside className="home-aside">
        <h3>The website</h3>
        <span className="web-list">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </span>
        {user && <>
          <h3>Account info</h3>
          <section className="loged-web-list">
            <span>Books in list: {user.booksQuantity}</span>
            <span>Books read: {user.readBooks}</span>
          </section>
          </>}
      </aside>
      <div className="main-description">
        <h3>Find here the book you want!</h3>
        <section className="description-section">
          <textarea
            onChange={handleChange}
            value={inpValue}
            className="description-input"
            placeholder="Enter a description of a book you'd like to read or a part of one you know."
          ></textarea>
          {logError ? <p className="home-error">{logError}</p> : <></>}
          <button onClick={handleClick} className="look-button">
            Look
          </button>
        </section>
        <section className="books-section">
          {books?.length > 0 && (
            <div className="books-grid">
              {books.map((book, index) => (
                <Book
                  key={index}
                  title={book.title}
                  authors={book.authors}
                  description={book.description}
                  publishedDate={book.publishedDate}
                  publisher={book.publisher}
                  coverImage={book.coverImage}
                  isbn={book.isbn}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
