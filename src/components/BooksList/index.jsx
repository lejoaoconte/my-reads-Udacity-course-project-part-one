import { useRef } from "react";

import "./BooksList.styles.scss";

import { BookCover } from "../BookCover";

export function BooksList({
  books,
  handleOpenCloseModal,
  handleUpdateStateBook,
}) {
  const scrollable = useRef(null);

  function handleScrool(rightLeft) {
    const scrollLength = 1024;
    if (scrollable?.current) {
      scrollable?.current?.scrollBy({
        left: scrollLength * (rightLeft ? 1 : -1),
        behavior: "smooth",
      });
    }
  }

  function onClickOpenDetails(bookData) {
    handleOpenCloseModal(bookData);
  }

  return (
    <div className="books-list-container">
      <ul ref={scrollable} className="books-list">
        {books.map((book, index) => (
          <li key={index}>
            <BookCover
              onClickOpenDetails={() => onClickOpenDetails(book)}
              handleUpdateStateBook={handleUpdateStateBook}
              background={book?.imageLinks?.thumbnail}
              hasbottom={true}
              clicked={true}
              book={book}
            />
          </li>
        ))}
      </ul>
      <button
        className="button-scrool button-scrool-right"
        onClick={() => {
          handleScrool(true);
        }}
      >
        &#10097;
      </button>
      <button
        className="button-scrool button-scrool-left"
        onClick={() => {
          handleScrool(false);
        }}
      >
        &#10096;
      </button>
    </div>
  );
}
