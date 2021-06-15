window.addEventListener('DOMContentLoaded', () => {
  app();
});

function app() {
  
  // ** 
  // * @bookInput is an NodeList of elements
  // * where
  // * [0] - Author Name
  // * [1] - Book Title
  // * [2] - Genre
  // * [3] - Poster link
  // **
  let booksCounter = 0;
  const bookInput = document.querySelectorAll(".bookInput");
  const addBookButton = document.querySelector(".addBook");
  const bookList = document.querySelector(".booksList");

  // ** Look into localStorage and show it in browser if exists
  getBooks();

  addBookButton.addEventListener('click', addBook);

  function addBook(event) {
    event.preventDefault();

    // ** 
    // * Check if Input field values filled properly
    // * and subcheck if poster image was added.
    // * If not - load placeholder image
    // **
    if (bookInput[0].value.length == 0 ||
        bookInput[1].value.length == 0 ||
        bookInput[2].value.length == 0) {
      alert("Fill all fields first!");
    } else {
      if (bookInput[3].value.length == 0) {
        bookInput[3].value = "default_book.png";
      }

      const container = document.querySelector("#booksList");
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('column', 'book');

      // **
      // * Book item template
      // **
      const bookData = `
          <img src="${bookInput[3].value}" alt="${bookInput[1].value} Poster">
            <h5>Author: <b>${bookInput[0].value}</b></h5>
            <h5>Title: <b>${bookInput[1].value}</b></h5>
            <h5>Genre: <b>${bookInput[2].value}</b></h5>`;

      // ** Showing items in browser and write data in localStorage
      bookDiv.innerHTML = bookData;
      container.appendChild(bookDiv);
      saveToLocalStorage({Author: `${bookInput[0].value}`, Title: `${bookInput[1].value}`, Genre: `${bookInput[2].value}`, img: `${bookInput[3].value}`});

      // ** Clear input fields after adding book
      bookInput[0].value = "";
      bookInput[1].value = "";
      bookInput[2].value = "";
      bookInput[3].value = "";

      alert("Book added");
    };
  };
  

  function saveToLocalStorage(book) {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  // **
  // * Load books from localStorage
  // **
  function getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    };

    // ** 
    // * Get each {...} item in localStorage and
    // * generate for it DOM content
    // **
    books.forEach((book) => {
      const container = document.querySelector("#booksList");
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("column", "book");

      // **
      // * Template from localStorage:
      // * book.Author, book.Title, book.Genre, book.img
      // **
      bookDiv.innerHTML = `
      <img src="${book.img}" alt="${bookInput[1].value} Poster"> 
          <h5>Author: <b>${book.Author}</b></h5>
          <h5>Title: <b>${book.Title}</b></h5>
          <h5>Genre: <b>${book.Genre}</b></h5>`;

      container.appendChild(bookDiv);
    });
  };

  // **
  // * TODO
  // * 1) make an remove item function (from localStorage)
};

