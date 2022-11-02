import { useState } from "react";

import "./ButtonEditBook.styles.scss";

export function ButtonEditBook({ handleUpdateStateBook, book }) {
  const [openMenuButton, setOpenMenuButton] = useState(false);

  return (
    <div>
      {openMenuButton ? (
        <div
          className="menu-options-edit"
          onMouseLeave={() => setOpenMenuButton(false)}
        >
          <ul>
            <li>
              <button
                onClick={() => handleUpdateStateBook(book, "currentlyReading")}
              >
                Currently Reading
              </button>
            </li>
            <li>
              <button onClick={() => handleUpdateStateBook(book, "wantToRead")}>
                Want To Read
              </button>
            </li>
            <li>
              <button onClick={() => handleUpdateStateBook(book, "read")}>
                Read
              </button>
            </li>
            <li>
              <button onClick={() => setOpenMenuButton(false)}>Close</button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="button-edit-book"
          onClick={() => setOpenMenuButton(true)}
        >
          &#9998;
        </button>
      )}
    </div>
  );
}
