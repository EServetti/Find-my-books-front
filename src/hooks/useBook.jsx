import axios from "axios";
import { path } from "../path";
import { useEffect, useState } from "react";

function useBook(isbn) {
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState(null)
    const [related, setRelated] = useState(null)
    const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBook() {
      axios
        .post(`${path}/api/books/${isbn}`, {

        }, {withCredentials: true})
        .then((res) => {
          const response = res.data
          if (response.statusCode === 200) { 
            setBook(response.message)            
            setLoading(false)
            setRelated(response.relatedBooks)
            setError(null)
          } else {
            setError(response.message)
          }
        });
    }
    fetchBook();
  }, [isbn]);

  return {book, loading, error, related}
}

export default useBook