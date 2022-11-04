import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import ReactModal from "react-modal";

import "./Home.styles.scss";

import { BooksList } from "components/BooksList";
import { TitleSection } from "components/TitleSection";
import { BookDetails } from "components/BookDetails";
import { Loading } from "components/Loading";

import { getAll, update } from "services/api";

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

export function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookDataModal, setBookDataModal] = useState({});

  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  useEffect(() => {
    setLoading(true);
    getAllData();
    document.title = "My Reads | Home";
  }, []);

  function getAllData() {
    getAll()
      .then((res) => {
        setBooks(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  function handleOpenCloseModal(bookData) {
    if (!isOpenModal) {
      setBookDataModal(bookData);
    } else {
      setBookDataModal({});
    }
    setIsOpenModal(!isOpenModal);
  }

  function handleUpdateStateBook(book, shelf) {
    setLoading(true);
    update(book, shelf)
      .then(() => {
        getAllData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (loading) return <Loading />;

  return (
    <>
      <main className="main-home">
        <TitleSection title="Currently Reading" />
        <BooksList
          handleOpenCloseModal={handleOpenCloseModal}
          handleUpdateStateBook={handleUpdateStateBook}
          books={currentlyReading}
        />
        <TitleSection title="Want To Read" />
        <BooksList
          handleOpenCloseModal={handleOpenCloseModal}
          handleUpdateStateBook={handleUpdateStateBook}
          books={wantToRead}
        />
        <TitleSection title="Read" />
        <BooksList
          handleOpenCloseModal={handleOpenCloseModal}
          handleUpdateStateBook={handleUpdateStateBook}
          books={read}
        />
      </main>

      <Link to="/books-search" className="button-add">
        +
      </Link>

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
    </>
  );
}
