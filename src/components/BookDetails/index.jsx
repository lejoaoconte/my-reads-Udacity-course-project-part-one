import "./BookDetails.styles.scss";

import { BookCover } from "../BookCover";

export function BookDetails({ bookDataModal, handleOpenCloseModal }) {
  function formatDate(date) {
    const DateSplit = date.split("-");

    return `${DateSplit[2]}/${DateSplit[1]}/${DateSplit[0]}`;
  }

  return (
    <div className="book-details-container">
      <button onClick={handleOpenCloseModal}>&#10006;</button>
      <BookCover
        background={bookDataModal?.imageLinks?.thumbnail}
        hasbottom={false}
        clicked={false}
      />
      <div className="book-details">
        <h1>{bookDataModal?.title}</h1>
        <div className="authors-area">
          {bookDataModal?.authors?.map((author) => (
            <h3 key={author}>{author}</h3>
          ))}
        </div>
        <p>
          <span>Pages:</span> {bookDataModal?.pageCount}
        </p>
        <p>
          <span>Published Date:</span>
          {formatDate(bookDataModal?.publishedDate)}
        </p>
        <p>
          <span>Description:</span> {bookDataModal?.description}
        </p>
        <p>
          <span>
            <a
              rel="noreferrer"
              href={bookDataModal?.previewLink}
              target="_blank"
            >
              See More
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
