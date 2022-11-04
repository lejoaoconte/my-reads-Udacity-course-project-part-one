import "./BookSearchList.styles.scss";

import { BookCover } from "components/BookCover";

export function BookSearchList({
  books,
  handleOpenCloseModal,
  handleUpdateStateBook,
}) {
  function onClickOpenDetails(bookData) {
    handleOpenCloseModal(bookData);
  }

  return (
    <div className="container-book-search-list">
      {books.map((book, index) => (
        <div key={index}>
          <BookCover
            onClickOpenDetails={() => onClickOpenDetails(book)}
            handleUpdateStateBook={handleUpdateStateBook}
            background={book?.imageLinks?.thumbnail}
            hasbottom={true}
            clicked={true}
            book={book}
          />
        </div>
      ))}
    </div>
  );
}
