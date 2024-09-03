function Book ({title, authors, publishedDate, publisher, coverImage}) {
    const bookImage = coverImage !== 'No cover image available' ? coverImage : "./src/assets/book.png"
    return (
        <div className="book">
            <img src={bookImage} alt="book-image"/>
            <h4>{title}</h4>
            <span>Authors: {authors.join(', ')}</span>
            <span>Publisher: {publisher}</span>
            <span>Publication date: {publishedDate}</span>
            <button>Read more</button>
        </div>
    )
}

export default Book