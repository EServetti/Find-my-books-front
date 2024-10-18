import { useContext, useState } from "react";
import "../styles/home.css";
import find from "../services/findBook";
import Book from "../components/main/book";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const { user } = useContext(UserContext);

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

  //Limpiar seccion de descripcion
  function handleClean() {
    setInpValue("");
  }

  return (
    <div className="main-home">
      <aside className="home-aside">
        <h2>Web info:</h2>
        <span className="web-list">
          <Link to="/about">About & Contact</Link>
        </span>
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
          <span className="clean-and-look">
            <button onClick={handleClean} className="clean-button">
              Clean
            </button>
            <button onClick={handleClick} className="look-button">
              Look
            </button>
          </span>
        </section>
        <section className="books-section">
          {!books && (
            <section>
              Some advice:
              <ul>
                <li>It may take a while to return the books, please be patient.</li>
                <li>Try to give an understandable description.</li>
                <li>
                  If the book you are looking for does not appear, try another
                  description.
                </li>
              </ul>
              Don't you know what to write? Try with:
              <blockquote>
              "I want to read an adventure book with science fiction and mystery. I would also like it if there was a plot twist."
              </blockquote>
            </section>
          )}
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
