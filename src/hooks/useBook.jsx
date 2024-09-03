import axios from "axios";
import { path } from "../path";
import { useEffect, useState } from "react";

function useBook(title) {
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState(null)
    const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBook() {
      axios
        .post(`${path}/api/books/${title}`, {}, {withCredentials: true})
        .then((res) => {
          const response = res.data
          if (response.statusCode === 200) {            
            setBook(response.message)
            setLoading(false)
          } else {
            setError(response.message)
          }
        });
    }
    fetchBook();
  }, [title]);

  return {book, loading, error}
}

export default useBook