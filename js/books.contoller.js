'use strict'


function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooksForDisplay()
    console.log('renderbooks: , ', books)
    var strHtmls = `
    <table class="GeneratedTable">
    <thead>
        <tr>
            <th data-trans="book-id" >Id</th>
            <th data-trans="title2" >Title</th>
            <th data-trans="book-Price" >Price</th>
            <th data-trans="actions" >Actions</th>
          </tr>
    </thead>
    <tbody>`
    books.map(book => {
        strHtmls += `<tr class="books"><td>${book.id}</td>
            <td class="book-name"> ${book.title}</td>
            <td>${'$' + book.price}</td>
            <td>
                <button data-trans="the-book-deatails" onclick="onReadBook('${book.id}')">Details</button>
                <button data-trans="the-book-update"  onclick="onUpdateBook('${book.id}')">Update</button>
                <button data-trans="the-book-remove"  class="btn-remove" onclick="onDeleteBook('${book.id}')">Delete</button>
            </td>
            </tr>`
    });

    strHtmls += `</tbody> </table>`
    // console.log('strHtmls:', strHtmls)

    document.querySelector('.books-container').innerHTML = strHtmls
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg('Book Deleted')
}

function onAddBook() {
    var book = addBook()
    renderBooks()
    flashMsg(`Book Added (id: ${book.id})`)

}

function onUpdateBook(bookId) {
    var book = getBookByID(bookId)
    var updatePrice = +prompt('New Price?')
    if (updatePrice && book.price !== updatePrice) {
        book = updateBook(bookId, updatePrice)
        renderBooks()
        flashMsg(`Price updated to: ${'$' + book.price}`)
    }
}

function onReadBook(bookId) {
    const book = getBookByID(bookId)
    console.log('onreadbook', book)
    console.log('query', document.querySelector('[name="rate"]'))
    const elModal = document.querySelector('.modal')
    elModal.querySelector('.book-title').innerText = book.title
    elModal.querySelector('.book-rating-input').value = book.rate
    elModal.querySelector('.book-description').innerText = book.desc
    elModal.classList.add('open')
    var detailBookIdClicked = bookId;
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')

}

function onSetSortBy() {
    const prop = document.querySelector('.the-sort-by').value
    console.log('value:', prop)

    setBookSort(prop)
    renderBooks()
    _saveBooksToStorage()
}


function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function onSetFilterBy(filterBy) {
    console.log(':', filterBy)

    filterBy = setFilterBy(filterBy)
    renderBooks()
    _saveBooksToStorage()
}

function darkMode() {
    var elBody = document.body
    var icon = document.getElementById('icon')
    elBody.classList.toggle('dark-theme');
    if (elBody.classList.contains('dark-theme')) {
        icon.src = "img/icon-sun.svg"
        elBody.style.color = 'white'
    } else {
        elBody.style.color = 'black'
        icon.src = "img/icon-moon.svg"
    }
}

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}


