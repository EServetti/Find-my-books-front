import axios from "axios";
import { path } from "../path";
import Swal from "sweetalert2";

async function addToList(book, setError, setChange, change) {
  axios
    .post(
      `${path}/api/books/add`,
      {
        title: book.title,
        authors: book.authors.join(" "),
        description: book.description,
        coverImage: book.coverImage,
        publisher: book.publisher,
        infoLink: book.infoLink,
        publishedDate: book.publishedDate,
        isbn: book.isbn,
      },
      { withCredentials: true }
    )
    .then((res) => {
      const response = res.data;
      if (response.statusCode === 200) {
        Swal.fire({
          title: "The book was added!",
          text: "You can see it in your list",
          customClass: {
            popup: "custom-popup",
            title: "custom-title",
            content: "custom-content",
            confirmButton: "custom-confirm-button",
          },
          confirmButtonText: "",
        });
        setChange(!change);
      } else if(response.message === "Bad auth from poliecies!") {
        setError("You must login first!")
      } else {
        setError(response.message);
      }
    });
}

export default addToList;
