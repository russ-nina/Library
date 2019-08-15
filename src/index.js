import  avg from './some.js';

console.log(avg(1,3,7));

import './css/style.css';

window.onload = function () {
    let arrayDeleteButtons = [];
    let arrayEditButtons = [];
    const addBook = document.querySelector('.add_book');
    const modal = document.querySelector('.modal');
    const modalEdit = document.querySelector('.modal_edit');
    const modalCloseBtn = document.querySelector('.modal_close_btn');
    const modalEditCloseBtn = document.querySelector('.modal_edit_close_btn');
    const modalClose = document.querySelector('.modal_close');
    const modalEditClose = document.querySelector('.modal_edit_close');
    const modalAddBook = document.querySelector('.modal_add_book');
    const modalEditBook = document.querySelector('.modal_edit_book');

    addBook.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);
    modalEditCloseBtn.addEventListener('click',closeModalEdit);
    modalClose.addEventListener('click', closeModal);
    modalEditClose.addEventListener('click', closeModalEdit);
    modalAddBook.addEventListener('click', addBookToLibrary);
    modalEditBook.addEventListener('click', editBookInStorage);


    function openModal() {
        modal.classList.add('modal_open');
    }
    function openModalEdit() {
        modalEdit.classList.add('modal_open');
    }
    function closeModal() {
        modal.classList.remove('modal_open');
        clearInput();
    }
    function closeModalEdit() {
        modalEdit.classList.remove('modal_open');
        clearInputEdit();
    }
    function drawBook(id, serialObj) {
        let coverBook = document.createElement('div');
        coverBook.className = "cover_book";
        coverBook.setAttribute('data-id', id);
        let coverBooks = document.querySelector('.cover_books');
        coverBooks.appendChild(coverBook);

        let coverImage = document.createElement('div');
        coverImage.className = "cover_image";
        coverBook.appendChild(coverImage);

        let image = document.createElement('img');
        image.src = serialObj.modalBookImg;
        coverImage.appendChild(image);

        let title = document.createElement('h3');
        title.className = "title";
        title.innerText = serialObj.modalBookName;
        coverBook.appendChild(title);

        let author = document.createElement('p');
        author.className = "author";
        author.innerText = serialObj.modalBookAuthor;
        coverBook.appendChild(author);

        let publisherName = document.createElement('p');
        publisherName.className = "publisher_name";
        publisherName.innerText = "Видавництво: " + serialObj.modalPublisherName;
        coverBook.appendChild(publisherName);

        let publisherAddress = document.createElement('p');
        publisherAddress.className = "publisher_address";
        publisherAddress.innerText = serialObj.modalPublisherAddress;
        coverBook.appendChild(publisherAddress);

        let publisherYear = document.createElement('p');
        publisherYear.className = "publisher_year";
        publisherYear.innerText = serialObj.modalPublisherYear;
        coverBook.appendChild(publisherYear);

        let publisherPhone = document.createElement('p');
        publisherPhone.className = "publisher_phone";
        publisherPhone.innerText = serialObj.modalPublisherPhone;
        coverBook.appendChild(publisherPhone);

        let bookCategory = document.createElement('p');
        bookCategory.className = "book_category";
        bookCategory.innerText = "Категорія: " + serialObj.modalBookCategory;
        coverBook.appendChild(bookCategory);

        let coverButtons = document.createElement('div');
        coverButtons.className = "cover_buttons";
        coverBook.appendChild(coverButtons);

        let editBook = document.createElement('span');
        editBook.className = "editBook";
        editBook.innerText = "edit";
        coverButtons.appendChild(editBook);

        let deleteBook = document.createElement('span');
        deleteBook.className = "deleteBook";
        deleteBook.innerText = "delete";
        coverButtons.appendChild(deleteBook);
    }
    function clearInput() {
        let modalBookImg = document.querySelector('#modal_book_img');
        let modalBookName = document.querySelector('#modal_book_name');
        let modalBookAuthor = document.querySelector('#modal_book_author');
        let modalPublisherName = document.querySelector('#modal_publisher_name');
        let modalPublisherAddress = document.querySelector('#modal_publisher_address');
        let modalPublisherYear = document.querySelector('#modal_publisher_year');
        let modalPublisherPhone = document.querySelector('#modal_publisher_phone');
        let modalBookCategory = document.querySelector('#modal_book_category');
        modalBookImg.value = "";
        modalBookName.value = "";
        modalBookAuthor.value = "";
        modalPublisherName.value = "";
        modalPublisherAddress.value = "";
        modalPublisherYear.value = "";
        modalPublisherPhone.value = "";
        modalBookCategory.value = "";
    }
    function clearInputEdit() {
        let modalBookImg = document.querySelector('#modal_edit_img');
        let modalBookName = document.querySelector('#modal_edit_name');
        let modalBookAuthor = document.querySelector('#modal_edit_author');
        let modalPublisherName = document.querySelector('#modal_edit_publisher_name');
        let modalPublisherAddress = document.querySelector('#modal_edit_publisher_address');
        let modalPublisherYear = document.querySelector('#modal_edit_publisher_year');
        let modalPublisherPhone = document.querySelector('#modal_edit_publisher_phone');
        let modalBookCategory = document.querySelector('#modal_edit_category');
        modalBookImg.value = "";
        modalBookName.value = "";
        modalBookAuthor.value = "";
        modalPublisherName.value = "";
        modalPublisherAddress.value = "";
        modalPublisherYear.value = "";
        modalPublisherPhone.value = "";
        modalBookCategory.value = "";
    }
    function formSerialize(formElement) {
        const values = {};
        const inputs = formElement.elements;

        for (let i = 0; i < inputs.length; i++) {
            values[inputs[i].name] = inputs[i].value;
        }
        return values;
    }
    function addBookToLibrary() {
        const serialObj = formSerialize(document.querySelector('.modal_form'));
        const serialObjPars = JSON.stringify(serialObj);
        let id = +Math.round(Math.random()*100000);
        localStorage.setItem(id, serialObjPars);
        closeModal();
        drawBook(id, serialObj);
        createArrayDeleteButtons();
        createArrayEditButtons();
    }
    function deleteBookFromLibrary(e) {
        const par = e.target.parentNode.parentNode;
        const id = par.getAttribute('data-id');
        localStorage.removeItem(id);
        par.parentNode.removeChild(par);
        createArrayDeleteButtons();
        createArrayEditButtons();
    }
    function editBookInForm(e) {
        openModalEdit();
        const par = e.target.parentNode.parentNode;
        const id = par.getAttribute('data-id');
        modalEditBook.setAttribute('data-id', id);
        const valItem = JSON.parse(localStorage.getItem(id));
        let modalBookImg = document.querySelector('#modal_edit_img');
        let modalBookName = document.querySelector('#modal_edit_name');
        let modalBookAuthor = document.querySelector('#modal_edit_author');
        let modalPublisherName = document.querySelector('#modal_edit_publisher_name');
        let modalPublisherAddress = document.querySelector('#modal_edit_publisher_address');
        let modalPublisherYear = document.querySelector('#modal_edit_publisher_year');
        let modalPublisherPhone = document.querySelector('#modal_edit_publisher_phone');
        let modalBookCategory = document.querySelector('#modal_edit_category');
        modalBookImg.value = valItem.modalBookImg;
        modalBookName.value = valItem.modalBookName;
        modalBookAuthor.value = valItem.modalBookAuthor;
        modalPublisherName.value = valItem.modalPublisherName;
        modalPublisherAddress.value = valItem.modalPublisherAddress;
        modalPublisherYear.value = valItem.modalPublisherYear;
        modalPublisherPhone.value = valItem.modalPublisherPhone;
        modalBookCategory.value = valItem.modalBookCategory;
        par.parentNode.removeChild(par);
    }
    function editBookInStorage(e) {
        const idButton = e.target;
        const id = idButton.getAttribute('data-id');
        const serialObj = formSerialize(document.querySelector('.modal_edit_form'));
        const serialObjPars = JSON.stringify(serialObj);
        localStorage.setItem(id, serialObjPars);
        drawBook(id, serialObj);
        closeModalEdit();
        clearInputEdit();
        modalEditBook.removeAttribute('data-id');
        createArrayDeleteButtons();
        createArrayEditButtons();
    }
    function createArrayDeleteButtons() {
        let deleteBook = document.querySelectorAll('.deleteBook');
        arrayDeleteButtons = Array.prototype.slice.call(deleteBook);//преобразовую  nodelist в array
        arrayDeleteButtons.forEach(function (item) {
            item.addEventListener('click', deleteBookFromLibrary);
        });
    }
    function createArrayEditButtons() {
        let editBook = document.querySelectorAll('.editBook');
        arrayEditButtons = Array.prototype.slice.call(editBook);//преобразовую  nodelist в array
        arrayEditButtons.forEach(function (item) {
            item.addEventListener('click', editBookInForm);
        });
    }
};