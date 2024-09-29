import axios from "axios";
import { path } from "../path";

async function share(sharedWith, book, setError, setMessage) {
  if (sharedWith.length === 0) {
    setError("Please select a friend to share with");
  } else {
    for (const _id of sharedWith) {
      axios
        .post(
          `${path}/api/books/share`,
          {
            sharedWith: _id,
            book: {
              title: book.title,
              authors: Array.isArray(book.authors) ? book.authors.join(", ") : book.authors,
              publisher: book.publisher,
              publishedDate: book.publishedDate,
              description: book.description,
              infoLink: book.infoLink,
              coverImage: book.coverImage,
              isbn: book.isbn,
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          const response = res.data;
          if(response.statusCode === 200) {
            setMessage(response.message)
            setError(null)
          } else {
            setError(response.message)
            setMessage(null)
          }
        });
    }
  }
}

export default share;
