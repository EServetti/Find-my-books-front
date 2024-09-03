import { Link } from "react-router-dom"

function Book ({title, authors, publishedDate, publisher, coverImage}) {
    const bookImage = coverImage !== 'No cover image available' ? coverImage : "./src/assets/book.png"
    const linkURL = `/book/${title}`
    return (
        <div className="book">
            <img src={bookImage} alt="book-image"/>
            <h4>{title}</h4>
            <span>Authors: {authors.join(', ')}</span>
            <span>Publisher: {publisher}</span>
            <span>Publication date: {publishedDate}</span>
            <Link to={linkURL} className="book-button">Read more</Link>
        </div>
    )
}

export default Book