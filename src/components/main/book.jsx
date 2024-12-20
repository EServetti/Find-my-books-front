import { Link } from "react-router-dom"
import "../../styles/home.css"

function Book ({title, authors, publishedDate, publisher, coverImage, isbn}) {
    const bookImage = coverImage !== 'No cover image available' ? coverImage : "/img/book.png"
    const linkURL = `/book/${isbn}`
    return (
        <div className="book">
            <img src={bookImage} alt="book-image"/>
            <h4>{title}</h4>
            <span>Authors: {authors.join(', ')}</span>
            <span>Publisher: {publisher}</span>
            <span>Publication date: {publishedDate}</span>
            <span className="isbn">{isbn}</span>
            <Link to={linkURL} className="book-button">Read more</Link>
        </div>
    )
}

export default Book