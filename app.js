//book class that represents a book
// we use this to initialize an object one we create them we can always add stuff to them whn you use new it creates an empty object set this to point to the new object
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI class:handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    console.log(books);
    books.forEach(book => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td>
    <td><a href = "#" class="btn btn-danger btn-sm delete">X</a></td>`;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  // static showAlert(message, className) {
  //   const div = document.createElement('div');
  //   div.className = `alert alert-${className}`;
  //   div.appendChild(document.appendNode(message));
  //   const container = document.querySelector('.container');
  //   const form = document.querySelector('#book-form');
  //   container.insertBefore(div, form);
  //   //vanish in 3 second
  //   setTimeout(() => document.querySelector('.alert').remove(), 3000);
  // }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}
//store Class: handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
//store class:handles storage
//event:display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// event to add a book
document.querySelector('#book-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const book = new Book(title, author, isbn);
  if (title === '' || author === 0 || isbn === '') {
    UI.showAlert('please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    Store.addBook(book);
    // UI.showAlert('Book Added', 'success');
    UI.clearFields();
  }
});
//event : remove a book
document.querySelector('#book-list').addEventListener('click', e => {
  UI.deleteBook(e.target);
  // UI.showAlert('Book removed', 'success');
});
