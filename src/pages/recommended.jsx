import "../styles/recommended.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import useRecommended from "../hooks/useRecommended";
import Book from "../components/main/book";

function Recommended() {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading]);

  const { loadingRec, recommended } = useRecommended();
  return (
    <div className="main-recommended">
      <h2>Recommended books</h2>
      {loadingRec && <h3>Loading...</h3>}
      {recommended?.length === 0 ? (
        <section className="no-recommended">
          You don't have any books in your list that we can use to recommend
          more to you. Start by using a description of a book you'd like and add
          it to your list.
          <h3>How does it work?</h3>
          <span>
            When you add a book to your list, we use it to recommend other books
            you may like.
          </span>
        </section>
      ) : (
        <div className="recommended-books">
          <section className="recommended-books-grid">
            {recommended?.map((book, index) => (
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
          </section>
        </div>
      )}
    </div>
  );
}

export default Recommended;
