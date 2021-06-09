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
  const bookInput = document.querySelectorAll(".bookInput");

  const addBookButton = document.querySelector(".addBook");
  const bookList = document.querySelector(".booksList");

  addBookButton.addEventListener('click', addBook);

  function addBook(event) {
    event.preventDefault();

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    // **
    // * Creating a new list item from bookInput NodeList
    // **
    const bookData = `
      <img src="${bookInput[3].value}" alt="Poster" style="width:100%">
      <div class="container">
        <p>Author: <b>${bookInput[0].value}</b></p>
        <p>Title: <b>${bookInput[1].value}</b></p>
        <p>Genre: <b>${bookInput[2].value}</b></p>
      </div>`;

    const newBook = document.createElement('li');

    newBook.innerHTML = bookData;
    newBook.classList.add('bookItem');

    bookDiv.appendChild(newBook);
    bookList.appendChild(bookDiv);
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
};

