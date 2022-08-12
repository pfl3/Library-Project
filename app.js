const displayModal = document.querySelector(".add-book-modal");
const modalBackground = document.querySelector(".modal-background");
const closeModalBtn = document.querySelector(".close");
const addBookModal = document.querySelector(".add-book-modal");
const delModalBackground = document.querySelector(".del-modal-background");
const delAllWarning = document.querySelector(".delete-all-warning");
// START Buttons
const addBookBtn = document.querySelector(".add-book");
const deleteAllBtn = document.querySelector(".delete-all");
const deleteBtn = document.querySelector(".delete");
const closeDelModalBtn = document.querySelector(".delete-close");
const cancelBtn = document.querySelector(".cancel");
const trashBtn = document.querySelector(".trash");
const formAddBtn = document.querySelector(".form-add-btn");
//
const MainBookContainer = document.querySelector(".main-book-container");
// START Form input elements
const form = document.querySelector(".form-style");
let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let readInput = document.getElementById("read");

// Book Class Start: Makes book object

let elementid;
const myLibrary = [];
class Book {
  arrId = (Date.now() + "").slice(-10);
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
// Add book button on form
formAddBtn.addEventListener("click", function () {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );
  elementid = newBook.arrId;
  myLibrary.push(newBook);
  renderBookCard();
  modalBackground.classList.remove("modal-background-visible");
  displayModal.classList.remove("modal-visible");
  form.reset();
});
function renderBookCard() {
  const newCard = document.createElement("div");
  const removeBook = document.createElement("img");
  const bookTitleDiv = document.createElement("div");
  const titleLabel = document.createElement("p");
  const dynamicTitle = document.createElement("p");
  const authorDiv = document.createElement("div");
  const authorLabel = document.createElement("p");
  const dynamicAuthor = document.createElement("p");
  const pagesDiv = document.createElement("div");
  const pagesLabel = document.createElement("p");
  const dynamicPages = document.createElement("p");
  const readDiv = document.createElement("div");
  const changeReadStat = document.createElement("button");
  const dynamicRead = document.createElement("p");
  //
  MainBookContainer.appendChild(newCard);
  // render trash can for book delete functionality
  newCard.appendChild(removeBook);
  removeBook.classList.add("trash");
  removeBook.setAttribute(
    "src",
    "./Images/delete_FILL0_wght400_GRAD0_opsz48.svg"
  );
  newCard.classList.add("book-card-container");
  // set unique id for book card element
  newCard.setAttribute(`eleId`, `${elementid}`);

  newCard.appendChild(bookTitleDiv);
  bookTitleDiv.classList.add("book-title");
  bookTitleDiv.appendChild(titleLabel);
  titleLabel.textContent = `Title:`;
  bookTitleDiv.appendChild(dynamicTitle);
  newCard.appendChild(authorDiv);
  authorDiv.classList.add("book-author");
  authorDiv.appendChild(authorLabel);
  authorLabel.textContent = `Author:`;
  authorDiv.appendChild(dynamicAuthor);
  newCard.appendChild(pagesDiv);
  pagesDiv.classList.add("book-pages");
  pagesDiv.appendChild(pagesLabel);
  pagesLabel.textContent = `Pages:`;
  pagesDiv.appendChild(dynamicPages);

  //
  newCard.appendChild(readDiv);
  readDiv.classList.add("book-read");
  readDiv.appendChild(changeReadStat);
  changeReadStat.textContent = "Change Status";
  readDiv.appendChild(dynamicRead);

  // delete book card
  removeBook.addEventListener("click", function () {
    let currentIndex = myLibrary.findIndex(
      (book) => newCard.getAttribute("eleId") == book.arrId
    );
    console.log(newCard.getAttribute("eleId"));
    console.log(elementid);
    console.log(currentIndex);

    myLibrary.splice(currentIndex, 1);
    newCard.remove();
  });
  // render user input
  dynamicTitle.textContent = titleInput.value;
  dynamicAuthor.textContent = authorInput.value;
  dynamicPages.textContent = pagesInput.value;
  if (!readInput.checked) {
    dynamicRead.textContent = "Unread";
  } else {
    dynamicRead.textContent = "Read";
  }

  changeReadStat.addEventListener("click", function () {
    let curindex = myLibrary.findIndex(
      (book) => newCard.getAttribute("eleId") == book.arrId
    );
    if (dynamicRead.textContent === "Read") {
      dynamicRead.textContent = "Unread";
      myLibrary[curindex].read = false;
    } else {
      dynamicRead.textContent = "Read";
      myLibrary[curindex].read = true;
    }
  });
}
// open add book modal
addBookBtn.addEventListener("click", function () {
  modalBackground.classList.add("modal-background-visible");
  displayModal.classList.add("modal-visible");
});
// close add book modal
modalBackground.addEventListener("click", function (e) {
  if (e.target.matches(".modal-background-visible")) {
    modalBackground.classList.remove("modal-background-visible");
    displayModal.classList.remove("modal-visible");
    form.reset();
  }
});
closeModalBtn.addEventListener("click", function () {
  modalBackground.classList.remove("modal-background-visible");
  displayModal.classList.remove("modal-visible");
  form.reset();
});

// open delete all modal

deleteAllBtn.addEventListener("click", function () {
  delAllWarning.classList.add("warn-modal-visible");
  delModalBackground.classList.add("warn-modal-background-visible");
});
// close delete all modal
closeDelModalBtn.addEventListener("click", function () {
  delAllWarning.classList.remove("warn-modal-visible");
  delModalBackground.classList.remove("warn-modal-background-visible");
});
delModalBackground.addEventListener("click", function (e) {
  if (e.target.matches(".warn-modal-background-visible")) {
    delModalBackground.classList.remove("warn-modal-background-visible");
    delAllWarning.classList.remove("warn-modal-visible");
  }
});
cancelBtn.addEventListener("click", function () {
  delAllWarning.classList.remove("warn-modal-visible");
  delModalBackground.classList.remove("warn-modal-background-visible");
});
deleteBtn.addEventListener("click", function () {
  console.log("clicked");
  document
    .querySelectorAll(".book-card-container")
    .forEach((e) => e.parentNode.removeChild(e));
  myLibrary.splice(0, myLibrary.length);
  delAllWarning.classList.remove("warn-modal-visible");
  delModalBackground.classList.remove("warn-modal-background-visible");
});
