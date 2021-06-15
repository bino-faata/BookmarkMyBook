window.addEventListener('DOMContentLoaded', () => {
  app();
});

function app() {
  
  // ** 
  // * @bookInput is and NodeList of elements
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
  getBooks();

  addBookButton.addEventListener('click', addBook);

  function addBook(event) {
    event.preventDefault();

    if (bookInput[0].value.length == 0 ||
        bookInput[1].value.length == 0 ||
        bookInput[2].value.length == 0) {
      alert("Fill all fields first!");
    } else {
      if (bookInput[3].value.length == 0) {
        bookInput[3].value = "default_book.png";
      }
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      // **
      // * Book item template
      // **
      const bookData = `
          <img src="${bookInput[3].value}" class="book_poster" alt="Poster" style="width:100%">
          <div class="container">
            <p>Author: <b>${bookInput[0].value}</b></p>
            <p>Title: <b>${bookInput[1].value}</b></p>
            <p>Genre: <b>${bookInput[2].value}</b></p>
          </div>`;

      const newBook = document.createElement('li');

      newBook.innerHTML = bookData;

      bookDiv.appendChild(newBook);
      bookList.appendChild(bookDiv);
      
      saveToLocalStorage({Author: `${bookInput[0].value}`, Title: `${bookInput[1].value}`, Genre: `${bookInput[2].value}`, img: `${bookInput[3].value}`});

      // ** Clear input fields
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

    books.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const newBook = document.createElement('li');

      // **
      // * Template from localStorage:
      // * book.Author, book.Title, book.Genre, book.img
      // **
      newBook.innerHTML = `
      <img src="${book.img}" class="book_poster" alt="Poster" style="width:100%">
        <div class="container">
          <p>Author: <b>${book.Author}</b></p>
          <p>Title: <b>${book.Title}</b></p>
          <p>Genre: <b>${book.Genre}</b></p>
        </div>`;

      bookDiv.appendChild(newBook);
      bookList.appendChild(bookDiv);

    });
  };
};

