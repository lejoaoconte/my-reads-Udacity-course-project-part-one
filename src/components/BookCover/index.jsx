import "./BookCover.styles.scss";

import { ButtonEditBook } from "components/ButtonEditBook";

export function BookCover({
  background,
  onClickOpenDetails,
  hasbottom,
  clicked,
  handleUpdateStateBook,
  book,
}) {
  return (
    <div className="book-cover-container">
      <div
        style={{ backgroundImage: `url("${background}")` }}
        className={`book-cover-content ${clicked ? "button-cover" : ""}`}
        onClick={onClickOpenDetails}
      >
        <span className={`${clicked ? "see-more-span" : "none"}`}>&#9906;</span>
      </div>
      {hasbottom ? (
        <ButtonEditBook
          book={book}
          handleUpdateStateBook={handleUpdateStateBook}
        />
      ) : null}
    </div>
  );
}
