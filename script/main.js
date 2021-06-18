window.addEventListener("DOMContentLoaded", () => {
  app();
});

function app() {

  // ** Uniq ID generator
  const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // ** 
  // * Make visibility
  // **
  const form = document.querySelector(".form");
  const library = document.querySelector(".library");
  const exportLib = document.querySelector(".export");
  const importLib = document.querySelector(".import");

  const showFormButton = document.querySelector("#addBook");
  const showExportButton = document.querySelector("#export");
  const showImportButton = document.querySelector("#import");
  const showLibraryButton = document.querySelector("#library");

  const importDataButton = document.querySelector("#importData");

  showFormButton.addEventListener("click", () => {
    if(form.style.display !== "inherit") {
      library.style.display = "none";
      exportLib.style.display = "none";
      importLib.style.display = "none";
      form.style.display = "inherit";
    };
  });

  showLibraryButton.addEventListener("click", () => {
    if(library.style.display !== "inherit") {
        library.style.display = "";
        exportLib.style.display = "none";
        importLib.style.display = "none";
        form.style.display = "none";
      };
  });

  showExportButton.addEventListener("click", () => {
    if(exportLib.style.display !== "inline-block") {
        library.style.display = "none";
        exportLib.style.display = "inline-block";
        importLib.style.display = "none";
        form.style.display = "none";
      };
      showTextToExport();
  });

  showImportButton.addEventListener("click", () => {
    if(importLib.style.display !== "inline-block") {
        library.style.display = "none";
        exportLib.style.display = "none";
        importLib.style.display = "inline-block";
        form.style.display = "none";
      };
  });

  importDataButton.addEventListener("click", (event) => {
    event.preventDefault();
    const textareaImport = document.querySelector("#libraryImport");
    let importData = textareaImport.value;
    localStorage.setItem("books", JSON.stringify(importData));
  });

  function showTextToExport() {
    const displayElement = document.querySelector("#libraryExport");
    displayElement.value = localStorage.getItem("books");
  };  

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

  addBookButton.addEventListener("click", addBook);

  function addBook(event) {
    event.preventDefault();

    // **
    // * Check if Input field values filled properly
    // * and subcheck if poster image was added.
    // * If not - load placeholder image
    // **
    if (
      bookInput[0].value.length == 0 ||
      bookInput[1].value.length == 0 ||
      bookInput[2].value.length == 0
    ) {
      alert("Fill all fields first! If you dont have ");
    } else {
      if (bookInput[3].value.length == 0) {
        bookInput[3].value = "default_book.png";
      }

      const container = document.querySelector("#booksList");
      const bookDiv = document.createElement("div");
      const bookId = uid();
      bookDiv.classList.add("column", "book");
      bookDiv.setAttribute("id", bookId);

      // **
      // * Book item template
      // **
      const bookData = `
          <img src="${bookInput[3].value}" alt="${bookInput[1].value} Poster">
            <h5>Author: <b>${bookInput[0].value}</b></h5>
            <h5>Title: <b>${bookInput[1].value}</b></h5>
            <h5>Genre: <b>${bookInput[2].value}</b></h5>`;

      // ** Show items in browser and write data in localStorage
      bookDiv.innerHTML = bookData;
      container.appendChild(bookDiv);
      saveToLocalStorage({
        ID: `${bookDiv.getAttribute("id")}`,
        Author: `${bookInput[0].value}`,
        Title: `${bookInput[1].value}`,
        Genre: `${bookInput[2].value}`,
        img: `${bookInput[3].value}`,
      });

      // ** Clear input fields after adding book
      bookInput[0].value = "";
      bookInput[1].value = "";
      bookInput[2].value = "";
      bookInput[3].value = "";

    };
  };

  function saveToLocalStorage(book) {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  };

  // **
  // * Load books from localStorage
  // **
  function getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    // **
    // * Get each {...} item in localStorage and
    // * generate for it DOM content
    // **
    books.forEach((book) => {
      const container = document.querySelector("#booksList");
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("column", "book");
      bookDiv.setAttribute("id", book.ID);

      // **
      // * Template from localStorage:
      // * book.Author, book.Title, book.Genre, book.img
      // **
      bookDiv.innerHTML = `
      <img src="${book.img}" alt="${bookInput[1].value} Poster"> 
          <h5>Author: <b>${book.Author}</b></h5>
          <h5>Title: <b>${book.Title}</b></h5>
          <h5>Genre: <b>${book.Genre}</b></h5>
          <button id="delete">Delete Book</button>`;

      container.appendChild(bookDiv);
    });
  };

  // **
  // * Deleting book 
  // **
  const deleteButton = document.querySelectorAll("#delete");
  deleteButton.forEach((button) => {
    button.addEventListener("click", deleteBook);
  });

  function deleteBook(event){
    const item = event.target;
    const book = item.parentElement;
    item.parentElement.classList.add("deleting");
    item.parentElement.addEventListener("transitionend", ()=>{
      item.parentElement.remove();
      removelocalBook(book);
    });
  };

  // **
  // * Deleting book from localStorage
  // **
  function removelocalBook(book){
    let books;
    const bookId = book.getAttribute("id");

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    };

    // ** check id's
    if(bookId === book.id) {
      books.splice(books[book.id], 1);
      localStorage.setItem('books', JSON.stringify(books));
    };
  };


  // **
  // * TODO
  // * 1) Improve Import function (add to current library)
  // * 2) add some filter by author name, genre, title
  // **
};
