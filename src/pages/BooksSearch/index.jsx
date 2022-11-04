import { useState } from "react";

import ReactModal from "react-modal";

import { Link } from "react-router-dom";

import serializeForm from "form-serialize";

import "./BooksSearch.styles.scss";

import { SearchInput } from "components/SearchInput";
import { BookDetails } from "components/BookDetails";
import { BookSearchList } from "components/BookSearchList";
import { Loading } from "components/Loading";

import { search as searchApi, update } from "services/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function BooksSearch() {
  const [books, setBooks] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookDataModal, setBookDataModal] = useState({});
  const [loading, setLoading] = useState(false);

  function handleOpenCloseModal(bookData) {
    if (!isOpenModal) {
      setBookDataModal(bookData);
    } else {
      setBookDataModal({});
    }
    setIsOpenModal(!isOpenModal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { search } = serializeForm(e.target, { hash: true });
    const query = search;
    searchApi(query, 100)
      .then((res) => {
        if (res?.length > 0) setBooks(res);
        else setBooks([]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setBooks([]);
        setLoading(false);
      });
  }

  function handleUpdateStateBook(book, shelf) {
    setLoading(true);
    update(book, shelf)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (loading) return <Loading />;

  return (
    <main className="main-books-search">
      <Link to="/" className="go-back">
        &#8656;
      </Link>
      <form onSubmit={handleSubmit} className="form-search">
        <SearchInput />
        <button className="search-button">
          <span>&#9906;</span>
        </button>
      </form>
      {books?.length > 0 ? (
        <BookSearchList
          handleOpenCloseModal={handleOpenCloseModal}
          handleUpdateStateBook={handleUpdateStateBook}
          books={books}
        />
      ) : (
        <h1 className="empty-data">Sorry! We don't find results.</h1>
      )}

      <ReactModal
        isOpen={isOpenModal}
        onRequestClose={handleOpenCloseModal}
        style={customStyles}
        contentLabel="Book Detail Modal"
        ariaHideApp={false}
      >
        {isOpenModal ? (
          <BookDetails
            handleOpenCloseModal={handleOpenCloseModal}
            bookDataModal={bookDataModal}
          />
        ) : null}
      </ReactModal>
    </main>
  );
}
